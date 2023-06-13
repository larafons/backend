import { Router } from "express";
import { productModel } from "../models/product.model.js";
import ProductManager from '../../ProductManager.js'


const router = Router();

router.get('/', async (req, res) => {
    try{
        let products = await productModel.find()
        res.send({result:"success", payload:products})
    } catch (error) {
        console.log("Cannot get products with mongoose: "+error);
    }
});

router.post('/', async (req, res) => {
    let {title, description, price, thumbnails, code, stock, status, category} = req.body;
    if (!title || !description || !price || !code || !stock || !status || !category){
        return res.send({status: "error", error: "Incompatible values"});
    }
    let result = await productModel.create({
        title,
        description,
        thumbnails,
        price,
        code,
        stock,
        status,
        category,
    });
    res.send({status:"success", payload:result})
})

/*
const productManager = new ProductManager();


router.get('/', async (req, res) => { // ?limit=x
    let limit = req.query.limit;
    let products = await productManager.obtenerProductos();
    if (!limit){
        res.send({ payload: products });
    }
    else {
        res.send({ payload: products.slice(0, limit) });
    }
});

router.get('/:pid', async (req, res) => {
    let productId = req.params.pid;
    let product = await productManager.consultarProducto(productId);
    res.send(product)
});

router.post('/', async (req, res) => {
    const product = req.body;
    const result = await productManager.agregarProducto(product);
    res.send({ status: result });
});

router.put('/:pid', async(req, res) => {
    let productId = req.params.pid;
    let product= req.body;
    const result = await productManager.modificarProducto(productId, product)
    res.send({ status: result })
})

router.delete('/:pid', async(req, res) => {
    let productId = req.params.pid;
    const result = await productManager.eliminarProducto(productId);
    res.send({ status: result })
}); */

export default router;