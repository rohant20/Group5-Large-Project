const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { OpenAI } = require("openai");
const { Image } = require("../models/imageModel");
const { zodResponseFormat } = require("openai/helpers/zod");
const { DePopListing,
    EbayListing,
    GrailedListing,
    openAi_depop,
    openAi_ebay,
    openAi_grailed
} = require("../models/listingModel");


// Storage Configuration for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// OpenAI Instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Helper Function to Upload Image to MongoDB
const uploadImageToDB = async (imgFile) => {
    try {


        const image = await Image.create({
            data: imgFile.buffer,
            contentType: imgFile.mimetype,
        });

        return {
            contentType: image.contentType,
            data: image.data.toString("base64"), // Convert to Base64
            _id: image._id,
        };

    } catch (error) {
        throw new Error(error);
    }
};

// Function to Generate Listings via OpenAI
const generateListingDetails = async (platform, imageData, message, schema) => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Generate the most useful details for an online clothing listing for a reseller." },
            {
                role: "user",
                content: [
                    { type: "text", text: message },
                    {
                        type: "image_url",
                        image_url: {
                            "url": `data:${imageData.contentType};base64,${imageData.data}`
                        },
                    }
                ],
            },
        ],
        response_format: zodResponseFormat(schema, "listing"),
    });

    return completion.choices[0]?.message?.parsed;
};

// Create Listing Endpoint
const createListing = asyncHandler(async (req, res) => {
    try {

        // Parse Request Body
        const { username, title, size, price, quantity, condition } = req.body;

        const platform = JSON.parse(req.body.platform);
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required." });
        }

        // Upload Image to Database and Get Base64 Data
        const imageData = await uploadImageToDB(imageFile);
        // Define Platform-Specific Messages
        const platformMessages = {
            depop: "Using the image of a piece of clothing, create an object with a list of 5 hashtags, a description (less than 1000 characters), and the time period it was made to attract online shoppers to buy it.",
            ebay: "Using the image of a piece of clothing, create an object with a list of 10 hashtags, a description (less than 600 characters), gender, and sports team and player if applicable, to attract online shoppers to buy it.",
            grailed: "Using the image of a piece of clothing, create an object with a list of 10 hashtags, a description (less than 500 characters), gender, and the absolute lowest price the user should sell it for, to attract online shoppers to buy it.",
        };

        // Define Platform-Specific Schemas
        const schemas = {
            depop: openAi_depop,
            ebay: openAi_ebay,
            grailed: openAi_grailed,
        };

        const listings = [];

        // Generate Listings for Each Platform
        for (const p of platform) {
            if (!platformMessages[p] || !schemas[p]) {
                return res.status(400).json({ message: `Invalid platform: ${p}` });
            }

            const generatedDetails = await generateListingDetails(
                p,
                imageData,
                platformMessages[p],
                schemas[p]
            );

            listings.push({ platform: p, details: generatedDetails });
        }

        const generateListings = [{}];
        for (const l of listings) {
            let newListing;
            if (l.platform == "depop") {
                newListing = await DePopListing.create({
                    title: title,
                    user: username,
                    category: l.details.category,
                    size: size,
                    quantity: quantity,
                    price: price,
                    condition: condition,
                    description: l.details.description,
                    tags: l.details.tags,
                    platform: l.platform,
                    images: imageData._id,
                    age: l.details.age,
                })
            } else if (l.platform == "grailed") {
                newListing = await GrailedListing.create({
                    title: title,
                    category: l.details.category,
                    user: username,
                    size: size,
                    quantity: quantity,
                    price: price,
                    condition: condition,
                    description: l.details.description,
                    tags: l.details.tags,
                    platform: l.platform,
                    images: imageData._id,
                    gender: l.details.gender,
                    floorPrice: l.details.floorPrice
                })
            } else if (l.platform == "ebay") {
                newListing = await EbayListing.create({
                    title: title,
                    user: username,
                    category: l.details.category,
                    size: size,
                    quantity: quantity,
                    price: price,
                    condition: condition,
                    description: l.details.description,
                    tags: l.details.tags,
                    platform: l.platform,
                    images: imageData._id,
                    team: l.details.team,
                    player: l.details.player,
                    gender: l.details.gender
                })
            }

            generateListings.push(newListing);
        }
        res.status(200).json(generateListings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Exported Middleware and Routes
module.exports = {
    createListing,
    upload: upload.single("image"), // Multer middleware for single image upload
};
