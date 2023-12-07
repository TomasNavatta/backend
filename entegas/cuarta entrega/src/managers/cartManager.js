import fs from 'fs/promises';
import  __dirname  from '../utils.js';

export default class CartManager {
    constructor() {
        this.path = `${__dirname}/files/carts.json`;
    }

    async consultarCarritos() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const carritos = JSON.parse(data);
            return carritos;
        } catch (error) {
            return [];
        }
    }
    

    async addCarrito(carrito) {
        try {
            const carritos = await this.consultarCarritos();
            carrito.id = carritos.length + 1;
            carritos.push(carrito);
            await fs.writeFile(this.path, JSON.stringify(carritos, null, '\t'));
            return carrito;
        } catch (error) {
            console.error('Error al agregar carrito:', error);
            return null;
        }
    }

    async getProductosEnCarrito(carritoId) {
        try {
            const carritos = await this.consultarCarritos();
            const carrito = carritos.find(c => c.id == carritoId);
            return carrito ? carrito.products : null;
        } catch (error) {
            console.error('Error al obtener productos del carrito:', error);
            return null;
        }
    }

    async addProductoAlCarrito(carritoId, productId) {
        try {
            const carritos = await this.consultarCarritos();
            const carrito = carritos.find(c => c.id == carritoId);

            if (!carrito) {
                console.error('Carrito no encontrado');
                return null;
            }

            const existingProduct = carrito.products.find(p => p.product.id == productId);

            if (existingProduct) {
                // Si el producto ya existe, incrementa la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no existe, agrégalo al carrito
                const newProduct = {
                    product: { id: productId },
                    quantity: 1,
                };
                carrito.products.push(newProduct);
            }

            await fs.writeFile(this.path, JSON.stringify(carritos, null, '\t'));
            return carrito;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            return null;
        }
    }
}
