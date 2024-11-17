const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { Listing } = require("../models/listingModels");

const getAllProducts = asyncHandler(async (req, res) => {
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
    getAllProducts
}