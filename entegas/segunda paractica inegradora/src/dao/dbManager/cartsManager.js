import cartModel from "../models/carts.model.js"

export default class Carts{
    constructor(){
        console.log('Manager de cursos con Mongo')
    }
    getAll = async () => {
        let carts = await cartModel.find().lean().populate('products')
        return carts

    }

    getById = async (id) => {
        let cart = await cartModel.findOne({_id:id}).populate("products")
        return cart

    }

    saveCart = async (cart) => {
        let result = await cart.create(cart)
        return result

    }
    
    updateCart= async (id,cart) => {
        delete cart._id
        let result = await cartModel.updateOne({_id:id},{$set:cart})
        return result

    }
}