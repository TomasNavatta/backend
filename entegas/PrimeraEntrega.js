class ProductManager{

    constructor(){
        this.product = []
        this.nextId = 1;
    }

    getProduct(){
       return this.product
    }

    AddProduct(title, description, price, thumbnail, code, stock){
        if (!title || !price || !description || !thumbnail || !code || !stock) {
            console.error('todos los datos son requeridos');
            return;
          }
      
          // Check if the code is unique
          if (this.products.some(product => product.code === code)) {
            console.error('el producto con este codigo ya existe');
            return;
          }

        let id_product = (this.getProduct()).length
        
        const product = {
            id: this.nextId++,
            title: title,
            description: description, 
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        this.producto.push(product)
        return this.producto
    }

    getProductById(id) {
        const products = this.product.find(product => product.id === id);
        if (!products) {
          console.error('Product not found');
          return;
        }
        return products;
      }
    
}

const productoManager = new ProductManager()

productoManager.AddProduct('Iphone', 'Pantalla de 6.7", 1 tb de alamacenamiento', 2000, 'https://toppng.com/uploads/preview/apple-iphone-15-pro-max-natural-titanium-png-11695041051y3hjkvpdvc.png', '15 pro max', 10);
productoManager.AddProduct('Tv', 'Pantalla de 75", Tecnologia Oled', 10000, 'https://www.lg.com/mx/images/televisores/md07557421/gallery/D-01.jpg', 'LG UHD AI ThinQ 75 UQ80', 4);

console.log(productoManager.getProducts());    


console.log(productoManager.getProductById(1));
console.log(productoManager.getProductById(2));
console.log(productoManager.getProductById(3));
  
   
  
 
