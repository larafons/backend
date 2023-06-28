import express from 'express';
import ProductManager from '../daos/classes/ProductManagerMongoClass.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async(req, res) => {

  const page = req.query.page || 1; // Acá vamos a obtener por medio del query la pagina, nose vi llegaste a ver esto pero basicamente es esto: “/?page=5”
  
  let result = await productManager.obtenerProductos(2, page); // Pasamos el limita de prod que queremos mostrar y luego el numero de pagina que sacamos previamente!
  
  let prod = result.docs;
  
  console.log(result.docs);
  
  res.render('home', {
  
  products: prod,
  
  hasPrevPage: result.hasPrevPage,
  
  hasNextPage: result.hasNextPage,
  
  nextPage: result.nextPage,
  
  prevPage: result.prevPage,
  
  page: result.page
  
  });
  
  });
  

router.get('/realtimeproducts', async(req, res) => {
    let products = await productManager.obtenerProductos();
    res.render('realTimeProducts', {products});
  });

  router.get('/chat',(req,res)=>{
    res.render('chat');
})



export default router;