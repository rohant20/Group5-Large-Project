const express = require("express");
const productRouter = express.Router();

const { getAllProducts } = require("../controllers/inventoryController");



productRouter.post("/getinventory", getAllProducts);

module.exports = {
    productRouter
}