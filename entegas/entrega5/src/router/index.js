const cartsController = require('../controllers/carts.controller')
const chatController = require('../controllers/chat.controller')
const productsController = require('../controllers/products.controller')
const messagesController = require('../controllers/messages.controller')

const router = app => {
    app.use('/carts', cartsController),
    app.use('/chat', chatController),
    app.use('/products', productsController),
    app.use('/api/messages', messagesController)
}

module.exports = router