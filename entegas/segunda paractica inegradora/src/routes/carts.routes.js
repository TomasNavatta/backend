import { Router } from "express";
import Carts from "../dao/dbManager/cartsManager.js";

const router = Router();
const cartsService = new Carts();

// DELETE api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartsService.getById(cid);
    cart.products = cart.products.filter((product) => product.product.toString() !== pid);
    await cartsService.updateCart(cid, { products: cart.products });
    res.send({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

// GET api/carts/:cid
router.get("/:cid", async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartsService.getById(cid);
        res.render('carts.handlebars',{ status: "success", message: cart.products });
    }catch (error) {
        res.json({ status: "error", error });
    }
});

// PUT api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { stock } = req.body;
  try {
    const cart = await cartsService.getById(cid);
    const product = cart.products.find((product) => product.product.toString() === pid);
    product.stock = stock;
    await cartsService.updateCart(cid, { products: cart.products });
    res.send({ status: "success", message: "Cantidad de producto actualizada" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

// DELETE api/carts/:cid
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    await cartsService.updateCart(cid, { products: [] });
    res.send({ status: "success", message: "Todos los productos eliminados del carrito" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getAll();
    res.send({ status: "success", message: carts });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = { products: [] };
    const cart = await cartsService.saveCart(newCart);
    res.send({ status: "success", message: cart });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const productid = req.body.productid;
    const cart = await cartsService.getById(id);
    cart.products.push({ product: productid });
    const cartUpdated = await cartsService.updateCart(id, { products: cart.products });
    res.json({ status: "success", message: cartUpdated });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

export default router;
