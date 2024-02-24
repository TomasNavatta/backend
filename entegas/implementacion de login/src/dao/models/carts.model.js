import mongoose from "mongoose";


const collection = "Cart"

const cartSchema = new mongoose.Schema({
   products: {
    type: [
        {product:
        {
          
                type: mongoose.Schema.Types.ObjectId,
                ref:"Products"
            
        }}
    ],
    default:[],
   
}

})

cartSchema.pre("findOne", function(){
    this.populate("products.product")
}) 

const cartModel = mongoose.model(collection, cartSchema)

export default cartModel