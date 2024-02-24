import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viesRouter from "./routes/views.router.js"
import sessionRouter from "./routes/sessions.routes.js"
import passport from "passport"
import inicializePassport from "./config/passport.config.js"

const MONGO = "mongodb+srv://tomasnavatta:FXVstxFlHvcRxsag@tomas.xyielog.mongodb.net/Session1"

const app = express()

const PORT = 8080

const connection = mongoose.connect(MONGO)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))



app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized:false
}))

inicializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views")
app.set('view engine', 'handlebars')

app.use('/', viesRouter)
app.use('/api/sessions', sessionRouter)

app.listen(PORT, ()=>{
    console.log(`servidor funcionando en el puerto ${PORT}`)
})
