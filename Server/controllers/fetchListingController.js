const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { Listing, DePopListing, EbayListing, GrailedListing } = require("../models/listingModel");

const getListingByID = asyncHandler(async (req, res) => {
    try {

        const listingID = req.body._id;

        const currListing = await Listing.findOne({
            _id: listingID
        })

        if (currListing == null) {
            res.status(404).json({ message: "Listing not found" })
        }

        res.status(200).json(currListing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getListingsByUser = asyncHandler(async (req, res) => {
    try{
            
            const username = req.body.username;
    
            const currListings = await Listing.find({
                user: username
            })

            if(currListings == null || currListings.length == 0){
                return res.status(404).json({ message: "No listings found" })
            }

            res.status(200).json(currListings);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    getListingByID, getListingsByUser
}