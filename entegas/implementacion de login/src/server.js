const express = require('express')
const handlebars = require('express-handlebars')
const router = require('./router')
const mongoConnect = require('./db')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(process.cwd() + '/src/public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'cookieSecret',
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://ivannavatta:eDlcx9r5lHFSbvLJ@cluster0.4yvhxqm.mongodb.net/Segunda-pre-entrega?retryWrites=true&w=majority',
        ttl: 120,
    }),
    resave: false,
    saveUninitialized: false
}))
app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')

router(app)

mongoConnect()

module.exports = app