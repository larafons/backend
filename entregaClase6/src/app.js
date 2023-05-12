const express = require('express')
const ProductManager = require('../../entregaClase4/desafio2Archivos').default;

const app = express();
const productManager = new ProductManager();

app.listen(8080, ()=> console.log('Servidor 8080 levantado'))

app.get('/products', async (req, res) => { // ?limit=x
    let limit = req.query.limit;
    if (!limit){
        res.send(productManager.obtenerProductos());
    }
    else {
        res.send(productManager.obtenerProductos().slice(0, limit));
    }
});

app.get('/products/:pid', async (req, res) => {
    let productId = req.params.pid;
    res.send(productManager.consultarProducto(productId))
});