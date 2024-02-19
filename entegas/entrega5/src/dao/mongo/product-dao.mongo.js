const Product = require("../../models/product.model");

class ProductDao {
    async getAll(productsTrue){
        console.log('traer desde el dao');
        return await Product.find(productsTrue)
    }

    async createOne(newProduct){
        console.log('creado desde el dao');
        return await Product.create(newProduct)
    }

    async findOneDao(findTrueProducts){
        console.log('enconrado desde el dao');
        return await Product.findOne(findTrueProducts)
    }
    async updatedOneDao(updateProduct, newProductUpdated){
        console.log('actualizado desde el dao');
        return await Product.updateOne(updateProduct, newProductUpdated)
    }
    //el metodo delete no lo uso, ya que prefiero utilizar el soft deleate pero lo creo para que lo puedan porbar para que vean que funciona y elimina el producto de la base de datos
    async delateOneDao(delateProduct){
        return await Product.deleteOne(delateProduct) 
    }
}

module.exports = ProductDao