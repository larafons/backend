import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, default: 1}
  }]
});

export const cartModel = mongoose.model(cartCollection, cartSchema);