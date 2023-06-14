import express from 'express';
import ProductManager from '../daos/classes/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
    let products = await productManager.obtenerProductos();
    res.render('home', {products})
})

router.get('/realtimeproducts', async(req, res) => {
    let products = await productManager.obtenerProductos();
    res.render('realTimeProducts', {products});
  });

  router.get('/chat',(req,res)=>{
    res.render('chat');
})



export default router;