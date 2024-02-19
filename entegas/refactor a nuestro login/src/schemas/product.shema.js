const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    createAt: Date,
    updateAt: Date,
})

productSchema.plugin(mongoosePaginate)

module.exports = productSchema