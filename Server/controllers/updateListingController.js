const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { Listing, DePopListing, EbayListing, GrailedListing } = require("../models/listingModel");
const { Image } = require('../models/imageModel');


const editListing = asyncHandler(async (req, res) => {
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

const deleteListing = asyncHandler(async (req, res) => {
    try {

        const _id = req.body._id;

        let deletedListing = await Listing.findByIdAndDelete(_id);

        if (deletedListing == null) {
            res.status(404).json({ message: "Listing not found" })
        }

        res.status(200).json({ message: "Listing deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = {
    editListing, deleteListing
}