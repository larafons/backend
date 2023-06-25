import express from 'express';
import ProductManager from '../daos/classes/ProductManagerMongoClass.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
    let result = await productManager.obtenerProductos();
    console.log(result)
    res.render('home', {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
      page: result.page
    })
  });

router.get('/realtimeproducts', async(req, res) => {
    let products = await productManager.obtenerProductos();
    res.render('realTimeProducts', {products});
  });

  router.get('/chat',(req,res)=>{
    res.render('chat');
})



export default router;