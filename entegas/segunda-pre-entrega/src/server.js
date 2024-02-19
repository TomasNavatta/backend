const express = require('express')
const handlebars = require('express-handlebars')
const router = require('./router')
const mongoConnect = require('./db')


const app = express()


app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))
app.use(express.urlencoded({extended: true}))

router(app)

mongoConnect()

module.exports = app