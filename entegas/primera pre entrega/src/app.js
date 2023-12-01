import express from "express";
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import __dirname from "./utils.js";

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(`${__dirname}/public`))

const server = app.listen(PORT, ()=> {
    console.log(`el servidor funciona en el puerto: ${PORT}`)
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)