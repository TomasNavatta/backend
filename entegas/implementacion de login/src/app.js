import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import {engine} from "express-handlebars"
import __dirname from "./utils.js"
import productRoutes from "../src/routes/products.routes.js"
import cartRoutes from "../src/routes/carts.routes.js"
import sessionRouter from "./routes/sessions.routes.js"
import viewsRouter from "./routes/views.router.js"





const PORT = 8080
let messages = []

const app = express()

const MONGO = "mongodb+srv://tomasnavatta:FXVstxFlHvcRxsag@tomas.xyielog.mongodb.net/TareaPracticaIntegradora"

const connection = mongoose.connect(MONGO)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized:false
}))


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`)
})

app.engine("handlebars",engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
app.use(express.static(`${__dirname}/public`))

app.use("/products", productRoutes)
app.use("/cart", cartRoutes)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)


