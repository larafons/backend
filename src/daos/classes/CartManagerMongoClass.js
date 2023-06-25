import mongoose from 'mongoose'
import { cartModel } from '../models/cart.model.js'


export default class CartManager {
    connection = mongoose.connect('mongodb+srv://larafons94:Leonel37@codercluster.ktrwo5d.mongodb.net/?retryWrites=true&w=majority');

    async agregarCarrito () {
        let result = await cartModel.create({items: []}) 
        return result;
    }

    async obtenerCarritos () {
        let result = await cartModel.find()
        return result
    }

    async consultarCarrito (id) {
        let result = await cartModel.findOne({_id: id})
        return result
    }

    async agregarProductoAlCarrito(cartId, productId) {
        try {
            const existingCartItem = await cartModel.findOneAndUpdate(
                { _id: cartId, 'items.product': productId },
                { $inc: { 'items.$.quantity': 1 } },
                { new: true }
            );
            if (existingCartItem) {
                return existingCartItem;
            }
        
            const cart = await cartModel.findOneAndUpdate(
              { _id: cartId },
              { $push: { items: { product: productId } } },
              { new: true }
            );
        
            return cart;
          } catch (error) {
          console.log(error)
        }
      }
      
}