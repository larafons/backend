import { Router } from "express";
import CartManager from "../../CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    let cart = await cartManager.consultarCarrito(cartId);
    res.send(cart)
});

router.post('/', async (req, res) => {
    const cart = req.body;
    const result = await cartManager.agregarCarrito(cart);
    res.send({ status: result });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.agregarProductoAlCarrito(cartId, productId);
    res.send({ status: result });
});

export default router;