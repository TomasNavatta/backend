const productsController = require('../controllers/products.controller')
const cartsController = require('../controllers/carts.controller')
const viewsTemplateConttroller = require('../controllers/views-template.controller')
const authConttroller = require('../controllers/auth.controller')
const usersConttroller = require('../controllers/users.controller')

const router = app => {
    app.use('/products', productsController)
    app.use('/carts', cartsController)
    app.use('/', viewsTemplateConttroller)
    app.use('/auth', authConttroller)
    app.use('/users', usersConttroller)
} 

module.exports = router