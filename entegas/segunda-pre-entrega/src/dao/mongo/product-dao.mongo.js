const Product = require("../../model/product.model");

class productDao {
    async getAllDao(firtsParameter, secondParameter) {
        return Product.find(firtsParameter, secondParameter)
      }
    async createOneDao(firtsParameter, secondParameter){
        return Product.create(firtsParameter, secondParameter)
    }
    async updateOneDao(firtsParameter, secondParameter){
        return Product.updateOne(firtsParameter, secondParameter)
    }
    async findByIdDao(firtsParameter, secondParameter){
        return Product.findById(firtsParameter, secondParameter)
    }
    async delateOneDao(delateProduct){
        return await Product.deleteOne(delateProduct) 
    }
    async aggregate(aggregate){
        return await Product.aggregate(aggregate)
    }
}


module.exports = productDao