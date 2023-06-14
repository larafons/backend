import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    thumbnails: {
        type: Array,
    },
    code: {
        type: Number,
        unique: true
    },
    stock: {
        type: Number,
    },
    status: {
        type: Boolean,
    },
    category: {
        type: String,
    },
})

export const productModel = mongoose.model(productCollection, productSchema);