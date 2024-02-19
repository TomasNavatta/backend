const mongoose = require('mongoose')
const productSchema = require('../schemas/product.shema')

const productCollection = 'product'

const Product = mongoose.model(productCollection, productSchema)


module.exports = Product