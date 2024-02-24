import cartModel from "../models/carts.model.js";

export default class Carts {
    async findById(id) {
        return await cartModel.findById(id);
    }

    async update(id, data) {
        return await cartModel.findByIdAndUpdate(id, data);
    }

    async create(data) {
        return await cartModel.create(data);
    }

    async deleteProduct(cid, pid) {
        const cart = await cartModel.findById(cid);
        cart.products = cart.products.filter((product) => product.product.toString() !== pid);
        await cart.save();
    }

    async deleteAllProducts(cid) {
        return await cartModel.findByIdAndUpdate(cid, { products: [] });
    }

    async getAll() {
        return await cartModel.find();
    }

    async addProduct(cid, productId) {
        const cart = await cartModel.findOne({ _id: cid });
        cart.products.push({ product: productId });
        return await cartModel.updateOne({ _id: cid }, cart);
    }
}
