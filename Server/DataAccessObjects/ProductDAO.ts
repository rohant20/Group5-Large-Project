/* Set up an interface to store the user data into an interface and here we combine two interfaces and other files can access the data*/
/* Database Schema needs help with */
import mongoose, {Schema, Document} from "mongoose"; /* Need to import mongodb Schema */
import { IProduct } from "../Models/Product";


export interface IProductModel extends IProduct, Document {};

const ProductsSchema = new Schema({
    barcode: {type:String, required:true, unique:true},
    name: {type:String, required: true},
    category: {type:String, required: true},
    brand: {type:String, required: true},
    price: {type: Number, required: true},
    count: {type: Number, required: true},
    description: {type:[String], required: true},
    rating: {type: Number, required: true},
    image: {type:String, required: true},
    size: {type:String, required: true},
    type: {type: String, required: true},
    date: {type:Date, required: true},
    
});

export default mongoose.model<IProductModel>('Product', ProductsSchema);