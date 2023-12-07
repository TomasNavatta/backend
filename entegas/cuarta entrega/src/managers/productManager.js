import fs from 'fs/promises';
import  __dirname  from '../utils.js';

export default class ProductManager {
    constructor() {
        this.path = `${__dirname}/files/products.json`;
    }

    async initializeId() {
        try {
            await fs.access(this.path);
        } catch (error) {
            // Si el archivo no existe, inicializa el ID a 1
            this.initialized = true;
            await fs.writeFile(this.path, '[]');
        }
    }

    async consultarProductos() {
        try {
            if (!this.initialized) {
                await this.initializeId();
            }

            const data = await fs.readFile(this.path, 'utf-8');
            const productos = JSON.parse(data);
            console.log('Productos cargados:', productos);
            return productos;
        } catch (error) {
            return [];
        }
    }

    async addProducto(producto) {
        try {
            if (!this.initialized) {
                await this.initializeId();
            }

            const productos = await this.consultarProductos();
            if (productos.length === 0) {
                producto.id = 1;
            } else {
                producto.id = productos[productos.length - 1].id + 1;
            }

            productos.push(producto);
            console.log('Productos después de agregar:', productos);
            await fs.writeFile(this.path, JSON.stringify(productos, null, '\t'));
            return productos;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            return null;
        }
    }

    updateProduct = async (productId, updatedData) => {
        const productos = await this.consultarProductos();
        
        const index = productos.findIndex(producto => producto.id === productId);
        
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }

        const updatedProduct = { ...productos[index], ...updatedData };
        productos[index] = updatedProduct;

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return updatedProduct;
    }

    deleteProduct = async (productId) => {
        const productos = await this.consultarProductos();
        
        const index = productos.findIndex(producto => producto.id === productId);
        
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }

        const deletedProduct = productos.splice(index, 1)[0];

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return deletedProduct;
    }
    getProducts() {
        return this.product;
    }
  
  
    getProductById(id) {
        const product = this.product.find(product => product.id === id);
        if (!product) {
            console.error('Producto no encontrado');
            return;
        }
        return product;
    }
  }

  

  

  