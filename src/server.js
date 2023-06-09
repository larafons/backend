import express from 'express';
import routerProducts from './router/products.router.js';
import routerCarts from './router/carts.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'
import ProductManager from './daos/classes/ProductManagerMongoClass.js';
import MessageManager from './daos/classes/MessageManagerMongoClass.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import sessionRouter from "./router/session.router.js";
import viewsRouter from './router/views.router.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js'

const productManager = new ProductManager();
const messageManager = new MessageManager();
const app = express();

const connection = mongoose.connect(
    'mongodb+srv://larafons94:Leonel37@codercluster.ktrwo5d.mongodb.net/?retryWrites=true&w=majority',
    );

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

initializePassport();
app.use(cookieParser())
app.use(
    session({
      store: new MongoStore({
        mongoUrl:
        'mongodb+srv://larafons94:Leonel37@codercluster.ktrwo5d.mongodb.net/?retryWrites=true&w=majority',
      }),
      secret: "mongoSecret",
      resave: true,
      saveUninitialized: false,
    })
  );
  
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);
app.use('/api/session/', sessionRouter)
app.use('/', viewsRouter);

const expressServer = app.listen(8080, () => console.log("Listening"));
const socketServer = new Server(expressServer);


socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado " + socket.id);
    
    socket.on('message', data => {
        console.log(data)
    })

    socket.on('crearProducto', async(product) => {
        await productManager.agregarProducto(product);
        let products = await productManager.obtenerProductos();
        socket.emit('productosActualizados', (products));
    })

    socket.on('eliminarProducto', async(productId) => {
        console.log("eliminando")
        await productManager.eliminarProducto(productId);
        let products = await productManager.obtenerProductos();
        socket.emit('productosActualizados', (products));
    })

    socket.on("message", (data) => {
        console.log(data)
        agregarYEnviarMensajes(data)
    });
    
    socket.on('authenticatedUser', (data)=>{
        socket.broadcast.emit('newUserAlert', data)
    })
    
});

async function agregarYEnviarMensajes(msg) {
    await messageManager.agregarMessage(msg);
    const messages = await messageManager.obtenerMessages();
    socketServer.emit("imprimir", messages);
  }

export default app;