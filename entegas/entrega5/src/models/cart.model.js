const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({

products: {
    type: [
    {
        product: {
            type: ObjectId, 
            ref: 'product'
        }
    }
]}

})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

const Cart = mongoose.model(cartCollection, cartSchema)

module.exports = Cart