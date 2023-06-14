import mongoose from 'mongoose'
import { productModel } from './models/product.model.js'


export default class ProductManager {
    connection = mongoose.connect('mongodb+srv://larafons94:Leonel37@codercluster.ktrwo5d.mongodb.net/?retryWrites=true&w=majority');

    async agregarProducto (product) {
        let result = await productModel.create(product) 
        return result;
    }

    async obtenerProductos(limit = null) {
        let result = await productModel.find()
        return result
    }

    async consultarProducto (id) {
        let result = await productModel.findOne({_id: id})
        return result
    }

    async modificarProducto (id, updatedProduct) {
        let result = await productModel.updateOne({_id: id}, {$set: updatedProduct})
        return result;
    }

    async eliminarProducto (id) {
        let result = await productModel.deleteOne({_id: id})
        return result
    }
}