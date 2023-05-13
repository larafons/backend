import express from 'express';
import ProductManager from '../../entregaClase6/ProductManager.js'


const app = express();
const productManager = new ProductManager();

app.listen(8080, ()=> console.log('Servidor 8080 levantado'))

app.get('/products', async (req, res) => { // ?limit=x
    let limit = req.query.limit;
    let products = await productManager.obtenerProductos();
    if (!limit){
        res.send(products);
    }
    else {
        res.send(products.slice(0, limit));
    }
});

app.get('/products/:pid', async (req, res) => {
    let productId = req.params.pid;
    let product = await productManager.consultarProducto(productId);
    res.send(product)
});

export default app;