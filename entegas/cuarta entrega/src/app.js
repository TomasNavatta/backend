import express from "express";
import {engine} from "express-handlebars";
import viewRouter from "./routes/views.route.js"
import __dirname from "./utils.js";
import {Server} from "socket.io";
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import ProductManager from "./managers/productManager.js";


const PORT = 8080;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const httpServer = app.listen(PORT, ()=> console.log(`servidor funcionando en el puerto: ${PORT}`));

const socketServer = new Server(httpServer)


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", express.static(`${__dirname}/public`))
app.use("/", viewRouter);
app.use("/realtimeproducts", viewRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado con ID:", socket.id);

    socket.on('addProduct', async (productData) => {
        try {
            console.log('Datos del producto recibidos en el servidor:', productData);

            const productManager = new ProductManager();
            const newProductId = await productManager.initializeId();

            // Verifica si productData es una cadena y conviértelo a un objeto
            if (typeof productData === 'string') {
                productData = JSON.parse(productData);
            }

            // Asigna el nuevo ID al objeto del producto
            productData.id = newProductId;

            await productManager.addProducto(productData);

            // Emite el evento 'newProduct' a todos los clientes conectados para actualizar la lista en tiempo real
            socketServer.emit('newProduct', productData);
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
        }
    });
});
