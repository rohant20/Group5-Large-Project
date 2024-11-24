const express = require("express");
const listingRouter = express.Router();
const multer = require('multer');
const upload = multer();

const { getListingByID, getListingsByUser, convertImage } = require("../controllers/fetchListingController");
const { createListing } = require("../controllers/generateListingController");


listingRouter.post("/fetchListingByID", getListingByID);
listingRouter.post("/fetchListingsByUser", getListingsByUser);
listingRouter.post("/generateListing", upload.single('image'), createListing);
listingRouter.post("/convertImage", convertImage);

module.exports = {
    listingRouter
}