const express = require("express");
const listingRouter = express.Router();

const { getListingByID, getListingsByUser } = require("../controllers/fetchListingController");


listingRouter.post("/fetchListingByID", getListingByID);
listingRouter.post("/fetchListingsByUser", getListingsByUser);

module.exports = {
    listingRouter
}