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
    try {

        const user = req.body.username;
        const filter = req.body.filter;
        const filterVal = req.body.filterVal;

        let listings;

        if (!user) {
            return res.status(400).json({ message: "Username is required" });
        }

        listings = await Listing.find({
            user: user
        });

        if (!(filter == "" || filterVal == "")) {
            listings = await Listing.find({
                $and: [
                    { user: user },
                    { [filter]: filterVal }
                ]
            });
        }


        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    getListingByID, getListingsByUser
}