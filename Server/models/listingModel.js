const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { z } = require("zod");

const BaseListingSchema = z.object({
    clothingType: z.string(),
    category: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),

});

//Platform Specific Schemas
const openAi_depop = BaseListingSchema.extend({
    age: z.number().optional(),
});

const openAi_ebay = BaseListingSchema.extend({
    team: z.string().optional(),
    player: z.string().optional(),
    gender: z.string().optional(),
});

const openAi_grailed = BaseListingSchema.extend({
    gender: z.string().optional(),
    floorPrice: z.number().optional(),
});




//MongoDB Schema
const baseListingSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // brand: {
    //     type: String,
    //     required: true,
    // },
    quantity: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    user: { // User who created the listing
        type: String,
        required: true,
    },
    images: {
        type: ObjectId,
        required: true,
    },
    platform: {
        type: String,
        required: true
    }
}, {
    discriminatorKey: 'kind', // Schema inheritance
    collection: "listings"

});

const DePopListingSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: false,
    }
});

const EbayListingSchema = new mongoose.Schema({
    team: {
        type: String,
        required: false,
    },
    player: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    }
});

const GrailedListingSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: false,
    },
    floorPrice: {
        type: Number,
        required: false,
    }
});

const Listing = mongoose.model("listings", baseListingSchema);

const DePopListing = Listing.discriminator("DePopListing", DePopListingSchema);
const EbayListing = Listing.discriminator("EbayListing", EbayListingSchema);
const GrailedListing = Listing.discriminator("GrailedListing", GrailedListingSchema);

module.exports = {
    Listing,
    DePopListing,
    EbayListing,
    GrailedListing,
    openAi_depop,
    openAi_ebay,
    openAi_grailed
};