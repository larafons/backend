import express from 'express';
import ProductManager from '../daos/classes/ProductManagerMongoClass.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
  const page = req.query.page || 1; //“/?page=5”
  let result = await productManager.obtenerProductos(2, page); 
  let admin= req.session.user.rol == "Administrador"
  console.log(admin)
  let prod = result.docs;
  console.log(result.docs);
    res.render('home', {
      products: prod,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
      page: result.page,
      user: req.session.user,
      admin: admin
    });
  });
  

router.get('/realtimeproducts', async(req, res) => {
    let products = await productManager.obtenerProductos();
    res.render('realTimeProducts', {products});
  });

  router.get('/chat',(req,res)=>{
    res.render('chat');
})

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/profile', (req, res) => {
  res.render('profile', {
      user: req.session.user
  });
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.json({ status: 'Logout ERROR', body: err })
    }
    return res.redirect('/login')
  })
 }) 

export default router;