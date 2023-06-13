import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    product: Array
})


export const cartModel = mongoose.model(cartCollection, cartSchema);