import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import initializePassport from "./config/passport.config.js"
import __dirname from "./utils.js"
import productRoutes from "../src/routes/products.routes.js"
import cartRoutes from "../src/routes/carts.routes.js"
import sessionRouter from "./routes/sessions.routes.js"
import viewsRouter from "./routes/views.router.js"





const PORT = 8080


const app = express()

const MONGO = "mongodb+srv://tomasnavatta:FXVstxFlHvcRxsag@tomas.xyielog.mongodb.net/SegundaPracticaIntegradora"

const connection = mongoose.connect(MONGO)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

initializePassport()
app.use(passport.initialize())
app.use(cookieParser())



const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`)
})

app.engine("handlebars",handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
app.use(express.static(`${__dirname}/public`))

app.use("/products", productRoutes)
app.use("/cart", cartRoutes)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)



