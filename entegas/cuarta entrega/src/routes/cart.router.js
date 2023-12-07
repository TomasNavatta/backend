import { Router } from 'express';
import CartManager from '../managers/cartManager.js';

const router = Router();
const path = "carts.json";
const managerCart = new CartManager(path);

// Ruta para listar todos los carritos
router.get('/', async (req, res) => {
    const allCarts = await managerCart.consultarCarritos();
    res.json({ carts: allCarts });
});

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = {
        id: (await managerCart.consultarCarritos()).length + 1,
        products: [],
    };

    await managerCart.addCarrito(newCart);
    res.json({ status: 'success', cart: newCart });
});

// Ruta para listar los productos de un carrito por ID
router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const cart = (await managerCart.consultarCarritos()).find(c => c.id == cartId);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
        res.json({ cart });
    }
});

// Ruta para agregar un producto al carrito por ID
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = (await managerCart.consultarCarritos()).find(c => c.id == cartId);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
        const existingProduct = cart.products.find(p => p.product.id == productId);

        if (existingProduct) {
            // Si el producto ya existe, incrementa la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no existe, agrégalo al carrito
            const newProduct = {
                product: { id: productId },
                quantity: 1,
            };
            cart.products.push(newProduct);
        }

        await managerCart.addProductoAlCarrito(cartId, productId);
        res.json({ status: 'success', cart });
    }
});

export default router;
