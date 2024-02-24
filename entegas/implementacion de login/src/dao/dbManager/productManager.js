import productsModel from "../models/products.model.js";

export default class Products {
    constructor() {
        console.log('Manager de productos con Mongo');
    }

    async getAllProducts(query) {
        try {
            let { limit, page = 1, sort, category } = query;
            const limitFilter = limit ? parseInt(limit) : 10;
            const filter = {};

            if (category) {
                filter.category = category;
            }

            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate(filter, {
                page,
                limit: limitFilter,
                sort: sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : undefined,
                lean: true
            });

            return {
                status: "success",
                products: docs,
                prevPage,
                limit,
                nextPage,
                page,
                sort,
                hasPrevPage,
                hasNextPage
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id);
            return {
                status: "success",
                message: product
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(product) {
        try {
            const result = await productsModel.create(product);
            return {
                status: "success",
                message: result
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductById(id) {
        try {
            const result = await productsModel.deleteOne({ _id: id });
            return {
                status: "success",
                message: result
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProductById(id, updateProduct) {
        try {
            const result = await productsModel.updateOne({ _id: id }, { $set: updateProduct });
            return {
                status: "success",
                message: result
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
