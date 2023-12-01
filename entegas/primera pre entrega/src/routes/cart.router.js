import { Router } from 'express';

const router = Router();

const carts = [];

// Ruta para listar todos los carritos
router.get('/', (req, res) => {
    res.json({ carts });
});

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = {
        id: carts.length + 1, // Autogenerar ID
        products: [],
    };

    carts.push(newCart);
    res.json({ status: 'success', cart: newCart });
});

// Ruta para listar los productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = carts.find(c => c.id == cartId);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
        res.json({ cart });
    }
});

// Ruta para agregar un producto al carrito por ID
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = carts.find(c => c.id == cartId);

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

        res.json({ status: 'success', cart });
    }
});

export default router;
