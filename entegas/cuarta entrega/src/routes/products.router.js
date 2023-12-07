import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const path = "products.json"
const manager = new ProductManager(path);

// Lee los productos desde el archivo JSON
const products = manager.consultarProductos();

// Ruta para listar todos los productos (con posibilidad de limitar)
router.get('/', async (req, res) => {
    const productos = await manager.consultarProductos();
    const limite = parseInt(req.query.limit);

    if (!isNaN(limite) && limite > 0) {
        res.json({ products: productos.slice(0, limite) });
    } else {
        res.json({ products: productos });
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
router.post('/', async (req, res) => {
    const productos = await manager.consultarProductos();
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Verificar si todos los campos requeridos están presentes
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnails' });
    }

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

    // Agregar el nuevo producto al archivo JSON
    manager.addProduct(newProduct);

    res.json({ status: 'success', product: newProduct });
});

// Ruta para actualizar un producto por ID
router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProductIndex = products.findIndex(p => p.id == productId);

    if (updatedProductIndex === -1) {
        res.status(404).json({ error: 'Producto no encontrado' });
    } else {
        // Actualizar el producto en el archivo JSON
        const updatedProduct = manager.updateProduct(productId, req.body);

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
        // Eliminar el producto en el archivo JSON
        const deletedProduct = manager.deleteProduct(productId);

        res.json({ status: 'success', deletedProduct });
    }
});

export default router;
