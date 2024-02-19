const Cart = require("../../model/cart.model");

class CartDao {
    async getAllCarts(x, y){
        console.log('traer desde el dao');
        return await Cart.find(x, y)
    }

    async createCart(newProduct){
        console.log('creado desde el dao');
        return await Cart.create(newProduct)
    }

    async findCart(firstParameter, secondParameter){
        console.log('enconrado desde el dao');
        return await Cart.findOne(firstParameter, secondParameter)
    }
    async findByIdCart(id) {
        const cart = await Cart.findById({ _id: id }).populate('products.product').lean();
        return cart;
    }
    async updatedCart(updateProduct, newProductUpdated){
        console.log('actualizado desde el dao');
        return await Cart.updateOne(updateProduct, newProductUpdated)
    }
    async updatedProductCart(cid, updatedProducts){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)

            if(cart){
                
              
                updatedProducts.forEach(updatedProduct => {

                    const existingProduct = cart.products.find(product => product.product.equals(updatedProduct.productId))
                    
                    if (existingProduct) {
                    
                    existingProduct.quantity = updatedProduct.quantity
                    
                    }
                    
                    })
                    await cart.save()

                    console.log('Updated  product');
                    return ({ status: 'success', message: 'Updated  product'})
               
            }
            else{
                console.log('The cart does not exist');
                return ({ status: 'error', message: 'el carrito no existe'})
            }
        } catch (error) {
            console.log('Error al actualizar el producto del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
    }
    async updatedProductStock(cid, pid, stock){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)

            if(cart){
                //compara el object id del array de products con el id que se pasa por parametros del producto
                const productIndex = cart.products.findIndex(productExist => productExist.product.toString() === pid.toString())
                console.log('Product Index:', productIndex); // Imprime el índice del producto
console.log('Product at Index:', cart.products[productIndex]); // Imprime los detalles del producto en el índice
                // si devuelve el contrario de -1(false), es decir 0(true), elimina el prodcuto
                if(productIndex !== -1){
                    console.log( cart.products[productIndex].stock);
                    cart.products[productIndex].stock = stock
                    console.log( cart.products[productIndex].stock);
                    //se gurda el carrito en la base de datos
                    await cart.save()

                    console.log('Updated stock product');
                    return ({ status: 'success', message: 'Updated stock product'})
                }
                else{
                    console.log('The product does not exist');
                    return ({ status: 'error', message: 'The product does not exist'})
                }
            }
            else{
                console.log('The cart does not exist');
                return ({ status: 'error', message: 'el carrito no existe'})
            }
        } catch (error) {
            console.log('Error al actualizar el producto del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
    }
    //el metodo delete no lo uso, ya que prefiero utilizar el soft deleate pero lo creo para que lo puedan porbar para que vean que funciona y elimina el producto de la base de datos
    async delateCart(delateProduct){
        return await Cart.deleteOne(delateProduct) 
    }
    async delateOneProductInCart(cid, pid){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)
            
            if(cart){
                //compara el object id del array de products con el id que se pasa por parametros del producto
                const productIndex = cart.products.findIndex(productExist => productExist.product.toString() === pid.toString())
                // si devuelve el contrario de -1(false), es decir 0(true), elimina el prodcuto
                if(productIndex !== -1){
                    //elimina el prdocuto del array con la propiedad splice, pasando el inidce del producto y como segundo parametro el 1 para elimar el producto
                    cart.products.splice(productIndex, 1)
                    //se gurda el carrito en la base de datos
                    await cart.save()
                    console.log('Delated product');
                    return ({ status: 'success', message: 'producto eliminado correctamente del carrito'})
                }
                else{
                    console.log('The product does not exist');
                    return ({ status: 'error', message: 'el producto no existe en el carrito'})
                }
            }
            else{
                console.log('The cart does not exist');
                return ({ status: 'error', message: 'el carrito no existe'})
            }
        } catch (error) {
            console.log('Error al eliminar el producto del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
     
    }
    async delateAllProductsInCart(cid){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)
            
            if(cart){
              if (cart.products.length ){
                cart.products = []
                await cart.save()
                    console.log('Delated all products');
                    return ({ status: 'success', message: 'Todos los productos fueron elimados del carrito'})
              }
              else{
                console.log('the cart has no products');
                return ({ status: 'error', message: 'El carrito no contiene productos'})
            }
                    
                }
                else{
                    console.log('The cart does not exist');
                    return ({ status: 'error', message: 'el carrito no existe'})
                }
            }
           
         catch (error) {
            console.log('Error al eliminar los productos del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
     
    }
}

module.exports = CartDao