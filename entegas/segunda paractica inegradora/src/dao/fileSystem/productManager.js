import fs from 'fs';
 export default class ProductManager {

    constructor() {
        this.path = './files/products.json';
    }

    consultarProductos = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8')
            const productos = JSON.parse(data);
            return productos
        } else{
            return [];
        }
    }

    addProducto = async (producto) => {

        const productos = await this.consultarProductos();
        if(productos.length === 0){
            producto.id = 1
        } else {
            producto.id = productos[productos.length-1].id + 1;
        }

        productos.push(producto);
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,'\t'))
        return productos

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
  

  

  