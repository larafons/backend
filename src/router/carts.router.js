import { Router } from "express";
import CartManager from "../daos/classes/CartManagerMongoClass.js";

const router = Router();
const cartManager = new CartManager();

router.get('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    let cart = await cartManager.consultarCarrito(cartId);
    res.send({ payload: cart })
});

router.post('/', async (req, res) => {
    const result = await cartManager.agregarCarrito();
    res.send({ status: result });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.agregarProductoAlCarrito(cartId, productId);
    res.send({ status: result });
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.quitarProductoDelCarrito(cartId, productId);
    res.send({ status: result });
});

router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const result = await cartManager.quitarTodosLosProductos(cartId);
    res.send({ status: result });
})

router.put('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;
    const result = await cartManager.actualizarCantProductos(cartId, productId, newQuantity);
    res.send({ status: result });
})

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const array = req.body.products;
    const result = await cartManager.actualizarArrayProductos(cartId, array);
    res.send({ status: result });
})

export default router;