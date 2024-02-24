import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const collection = "Products"

const productsSchema = new mongoose.Schema({
    category: String,
    name: String,
    description: String,
    price: Number,
    stock: Number
   
  
})

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(collection, productsSchema)

export default productsModel