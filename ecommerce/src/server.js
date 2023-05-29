import express from 'express';
import routerProducts from './router/products.router.js';
import routerCarts from './router/carts.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js'
import { Server } from 'socket.io'
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager();
const app = express();
app.use(express.static(__dirname+"/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);
app.use('/', viewsRouter);

const expressServer = app.listen(8080, () => console.log("Listening"));
const socketServer = new Server(expressServer);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado " + socket.id);
    
    socket.on('message', data => {
        console.log(data)
    })

    socket.on('crearProducto', data => {
        console.log(data)
        productManager.agregarProducto(data)
        socket.emit('productosActualizados', (productManager.obtenerProductos))
    })
    
});

export default app;