const { application } = require("express")
const express = require('express')
const ProductManager = require('../entregaClase4/desafio2Archivos').default;

const app = express();
const productManager = new ProductManager();

app.listen(8080, ()=> console.log('Servidor 8080 levantado'))

app.get('/products', (req, res) => {
    res.send(productManager.obtenerProductos());
});

app.get('/products/:pid', (req, res) => {
    let productId = req.params.pid;
    res.send(productManager.consultarProducto(productId))
});