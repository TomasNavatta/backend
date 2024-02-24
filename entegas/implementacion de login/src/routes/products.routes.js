import { Router } from "express";
import Products from "../dao/dbManager/productManager.js";

const router = Router();
const productsDAO = new Products();

router.get("/", async (req, res) => {
    try {
        const products = await productsDAO.getAllProducts(req.query);
        res.render('home.handlebars', products);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
});

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productsDAO.getProductById(id);
        res.send(product);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    const product = req.body;
    try {
        const result = await productsDAO.createProduct(product);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const result = await productsDAO.deleteProductById(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
});

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const updateProduct = req.body;
    try {
        const result = await productsDAO.updateProductById(id, updateProduct);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
});

export default router;
