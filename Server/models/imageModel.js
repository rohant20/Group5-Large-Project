const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const imageSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    }

}, {
    collection: "images"
}
);

const Image = mongoose.model("images", imageSchema);

module.exports = {
    Image
}