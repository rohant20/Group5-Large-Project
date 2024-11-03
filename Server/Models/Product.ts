/* By having exprot tytpe we can use the product type in other files. */
/*This file hold the object variables */

export interface IProduct {
    barcode: string;
    name: string;
    category: string[];
    brand: string;
    price: number;
    count: number;
    description: string[];
    rating: number;
    image: string;
    size: string;
    type: 'shirt' | 'Pants' | 'Dress';
}