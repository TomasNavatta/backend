class ProductManager {
  constructor() {
      this.product = [];
      this.nextId = 1;
  }

  getProducts() {
      return this.product;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !price || !description || !thumbnail || !code || !stock) {
          console.error('Todos los datos son requeridos');
          return;
      }

      // Check if the code is unique
      if (this.product.some(product => product.code === code)) {
          console.error('El producto con este código ya existe');
          return;
      }

      const product = {
          id: this.nextId++,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock
      };

      this.product.push(product);
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

const productoManager = new ProductManager();

productoManager.addProduct('Iphone', 'Pantalla de 6.7", 1 tb de almacenamiento', 2000, 'https://toppng.com/uploads/preview/apple-iphone-15-pro-max-natural-titanium-png-11695041051y3hjkvpdvc.png', '15 pro max', 10);
productoManager.addProduct('Tv', 'Pantalla de 75", Tecnología OLED', 10000, 'https://www.lg.com/mx/images/televisores/md07557421/gallery/D-01.jpg', 'LG UHD AI ThinQ 75 UQ80', 4);

console.log(productoManager.getProducts());
console.log(productoManager.getProductById(1));
console.log(productoManager.getProductById(2));
console.log(productoManager.getProductById(3));

