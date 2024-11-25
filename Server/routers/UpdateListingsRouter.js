const express = require("express");
const listingUpdateRouter = express.Router();


const { editListing, deleteListing } = require("../controllers/updateListingController");


listingUpdateRouter.post("/editListing", editListing);
listingUpdateRouter.post("/deleteListing", deleteListing);

module.exports = {
    listingUpdateRouter
}