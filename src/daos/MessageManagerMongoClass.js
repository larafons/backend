import mongoose from 'mongoose'
import { messageModel } from './models/message.model.js'

export default class MessageManager {
    connection = mongoose.connect('mongodb+srv://larafons94:Leonel37@codercluster.ktrwo5d.mongodb.net/?retryWrites=true&w=majority');

    async agregarMessage (message) {
        let result = await messageModel.create(message) 
        return result;
    }

    async obtenerMessages () {
        let result = await messageModel.find()
        return result
    }
}