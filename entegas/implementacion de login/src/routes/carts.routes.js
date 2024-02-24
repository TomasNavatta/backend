import { Router } from "express";
import cartModel from "../dao/models/carts.model.js"

const router = Router();

// DELETE api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartModel.findById(cid);
  cart.products = cart.products.filter((product) => product.product.toString() !== pid);
  await cart.save();
  res.send({ status: "success", message: "Producto eliminado del carrito" });
});


// GET api/carts/:cid
router.get("/:cid", async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).lean();
       res.render('carts.handlebars', {
        cart
        
       });
        

    }catch (error) {
        res.json({ status: "error", error });
      }
   
  
  });
  

// PUT api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { stock } = req.body;
  const cart = await cartModel.findById(cid);
  const product = cart.products.find((product) => product.product.toString() === pid);
  product.stock = stock;
  await cart.save();
  res.send({ status: "success", message: "Cantidad de producto actualizada" });
});

// DELETE api/carts/:cid
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  await cartModel.findByIdAndUpdate(cid, { products: [] });
  res.send({ status: "success", message: "Todos los productos eliminados del carrito" });
});


router.get("/", async (req, res) => {
  const carts = await cartModel.find();
  res.send({ status: "success", message: carts });

});

router.post("/", async (req, res) => {
  const newCart = { products: [] };
  const cart = await cartModel.create(newCart);
  res.send({ status: "success", message: cart });
});

router.put("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const productid = req.body.productid;
    const cart = await cartModel.findOne({ _id: id });
    cart.products.push({ product: productid });
    const cartUpdated = await cartModel.updateOne({ _id: id }, cart);
    res.json({ status: "success", message: cartUpdated });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

export default router;

