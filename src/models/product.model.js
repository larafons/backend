import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        unique: true
    },
    thumbnails: {
        type: Array,
        unique: true
    },
    code: {
        type: Number,
        unique: true
    },
    stock: {
        type: Number,
        unique: true
    },
    status: {
        type: Boolean,
        unique: true
    },
    category: {
        type: String,
        unique: true
    },
})

export const productModel = mongoose.model(productCollection, productSchema);