import express from "express";
import ProductManager from "./productManager.js";

const PORT = 8080;
const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto: ${PORT}`);
});

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.consultarProductos();
        res.json({ products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.get('/:idProducto', async (req, res) => {
    const idProducto = req.params.idProducto;
    try {
        const producto = await productManager.getProductById(idProducto);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ producto });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ error: 'Error al obtener producto por ID' });
    }
});
