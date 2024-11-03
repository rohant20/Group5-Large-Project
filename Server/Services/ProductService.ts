/* eslint-disable no-useless-catch */
/*CURD operation for the backend side */
import ProductDao, { IProductModel } from "../DataAccessObjects/ProductDAO";
import { IProduct } from "../Models/Product";


/* This will return all products */
export async function findAllProducts(): Promise<IProductModel[]>{
    return await ProductDao.find();
}

/* This will serach for product by the barcode type string to modify the product*/
export async function modifyProduct(product:IProductModel) {
    try {
        const id = await ProductDao.findOneAndUpdate({bacode: product.barcode}, product, {new: true});
        if (id) {
            return product;
            throw new Error("Item does not exist");
        }
    } catch (error:unknown) {
        throw error;
    }
    
}

/* add a new product by taking a product and return a product */
export async function registerProduct(product:IProduct):Promise<IProduct> {
    const savedProduct = new ProductDao(product);
    return await savedProduct.save();
}

/* This will take a barcode type string and return a promise of a string */
export async function removeProduct(barcode:string) :Promise<string>{
    try {
        const id = await ProductDao.findOneAndDelete({barcode});
        if(id) return "Succesfully deleted book";   

        throw new Error("Product does not exist");
    } catch (error:unknown) {
        throw error;
    }
    
}