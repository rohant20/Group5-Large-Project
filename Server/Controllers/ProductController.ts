
import {Request, Response} from 'express';
import { findAllProducts, registerProduct, modifyProduct,removeProduct } from "../Services/ProductService;

import { IProduct } from '../Models/Product;
import { IProductModel  } from "../DataAccessObjects/ProductDAO;


/* Return nothing but takes in a request and response */
async function getAllProducts(req:Request, res:Response) {
    try {
        const product = await findAllProducts();
        res.status(200).json({message: "Retrieved all books", count:product.length, product});
    } catch (error:unknown) {
        res.status(500).json({message: "Unable to retrieve books at this time", error});
        
    }
}

/* Return nothing but takes in a request and response */
async function createProduct(req:Request, res:Response ) {
    const product = req.body;
    try {
        const savedProduct = await registerProduct(product);
        res.status(201).json({message: "Product created succesfully", savedProduct});
    } catch (error:unknown) {
        res.status(500).json({message: "Unable to save book at this time", error});
        
    }
}

async function updateProduct(req:Request, res:Response) {
    const product = req.body;

    try {
        const updateProduct = await modifyProduct(product);   
    } catch (error:unknown) {
        res.status(500).json({message: "Unable to update book at this time", error});
    }
}

async function deleteProduct(req:Request, res:Response) {
    const {barcode} = req.params;

    try {
        const message = await removeProduct(barcode);
    } catch (error:unknown) {
        res.status(202).json({mesage: "Unable to delete book at this time", error});
    }
}

export default {getAllProducts, createProduct, updateProduct, deleteProduct};
