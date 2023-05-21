import express from 'express';
import routerProducts from './router/products.router.js';
import routerCarts from './router/carts.router.js';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname+'/public'));

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);

app.listen(8080, ()=> console.log('Servidor 8080 levantado'));

export default app;