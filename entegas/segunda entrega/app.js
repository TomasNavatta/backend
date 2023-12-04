import ProductManager from "./productManager/productManager.js";

const manager = new ProductManager();

const env = async () => {
    // Consultar productos antes de la actualización
    let primerConsulta = await manager.consultarProductos();
    console.log('Productos antes de la actualización:', primerConsulta);

    // Agregar un nuevo producto
    let producto = {
        title: 'iphone',
        descrption: 'Pantalla de 6.7", 1 tb de almacenamiento',
        price:2000,
        img:'https://toppng.com/uploads/preview/apple-iphone-15-pro-max-natural-titanium-png-11695041051y3hjkvpdvc.png',
        code: '15 pro max',
        stock: 20
    }
    let result = await manager.addProducto(producto);
    console.log('Productos después de agregar un nuevo producto:', result);

    // // Actualizar el producto recién agregado
    // const productId = 14; // El ID del producto que deseas actualizar
    // const updatedData = {
    //     nombre: 'samsung',
    //     ram: '16gb'
    // };
    // const updatedProduct = await manager.updateProduct(productId, updatedData);
    // console.log('Producto actualizado:', updatedProduct);

    // // Consultar productos después de la actualización
    // let segundaConsulta = await manager.consultarProductos();
    // console.log('Productos después de la actualización:', segundaConsulta);

    const productId = 5; // El ID del producto que deseas eliminar
    const deletedProduct = await manager.deleteProduct(productId);
    console.log('Producto eliminado:', deletedProduct);

    // Consultar productos después de la eliminación
    let terceraConsulta = await manager.consultarProductos();
    console.log(terceraConsulta);
}

env();
