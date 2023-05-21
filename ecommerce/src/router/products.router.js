import { Router } from "express";
import ProductManager from '../../ProductManager.js'


const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => { // ?limit=x
    let limit = req.query.limit;
    let products = await productManager.obtenerProductos();
    if (!limit){
        res.send(products);
    }
    else {
        res.send(products.slice(0, limit));
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
});

export default router;