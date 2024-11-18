const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const baseListingSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    count: {
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
    GrailedListing
};