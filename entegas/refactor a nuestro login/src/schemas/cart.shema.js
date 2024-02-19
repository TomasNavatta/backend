const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const cartSchema = new mongoose.Schema({
    products: {
       type: [ {
        product: {
            type: ObjectId,
            ref: 'product'
        }
        
       }
        
        ]
    },
    createAt: Date,
    updateAt: Date,

})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

module.exports = cartSchema