const Cart = require("../../models/cart.model");

class CartDao {
    async getAll(x, y){
        console.log('traer desde el dao');
        return await Cart.find(x, y)
    }

    async createOne(newProduct){
        console.log('creado desde el dao');
        return await Cart.create(newProduct)
    }

    async findOneDao(findTrueProducts){
        console.log('enconrado desde el dao');
        return await Cart.findOne(findTrueProducts)
    }
    async updatedOneDao(updateProduct, newProductUpdated){
        console.log('actualizado desde el dao');
        return await Cart.updateOne(updateProduct, newProductUpdated)
    }
    //el metodo delete no lo uso, ya que prefiero utilizar el soft deleate pero lo creo para que lo puedan porbar para que vean que funciona y elimina el producto de la base de datos
    async delateOneDao(delateProduct){
        return await Cart.deleteOne(delateProduct) 
    }
}

module.exports = CartDao