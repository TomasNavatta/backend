import { Router } from 'express';

const router = Router();

const products = [];

// Ruta para listar todos los productos (con posibilidad de limitar)
router.get('/', (req, res) => {
    const limite = parseInt(req.query.limit);
    if (!isNaN(limite) && limite > 0) {
        res.json({ products: products.slice(0, limite) });
    } else {
        res.json({ products });
    }
});

// Ruta para obtener un producto por ID
router.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = products.find(p => p.id == productId);

    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
    } else {
        res.json({ product });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const newProduct = {
        id: products.length + 1, // Autogenerar ID
        title,
        description,
        code,
        price,
        status: true, // Por defecto
        stock,
        category,
        thumbnails,
    };

    products.push(newProduct);
    res.json({ status: 'success', product: newProduct });
});

// Ruta para actualizar un producto por ID
router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProductIndex = products.findIndex(p => p.id == productId);

    if (updatedProductIndex === -1) {
        res.status(404).json({ error: 'Producto no encontrado' });
    } else {
        const updatedProduct = Object.assign(products[updatedProductIndex], req.body);
        res.json({ status: 'success', product: updatedProduct });
    }
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    const deletedProductIndex = products.findIndex(p => p.id == productId);

    if (deletedProductIndex === -1) {
        res.status(404).json({ error: 'Producto no encontrado' });
    } else {
        const deletedProduct = products.splice(deletedProductIndex, 1)[0];
        res.json({ status: 'success', deletedProduct });
    }
});

export default router;
