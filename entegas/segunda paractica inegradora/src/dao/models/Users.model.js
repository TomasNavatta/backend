import mongoose from "mongoose"

const collection = "Users"

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type:String,
        require:true
    },
    age: Number,
    password:{
        type:String,
        require:true
    },
    rol:{
        type:String,
        default:"user"
    },
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'carts' 
    }, 

})

const userModel = mongoose.model(collection, schema)

export default userModel