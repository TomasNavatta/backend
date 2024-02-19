const { Router } = require('express')
const CartDao = require('../dao/mongo/cart-dao.mongo')
const HTTP_RESPONSES = require('../constants/http_responses')


const router = Router()

const Cart = new CartDao()

router.get('/', async (req, res) => {
    try {
    const allCarts = await Cart.getAllCarts()
    res.json({ status: 'success', payload: allCarts})
    } catch (error) {
        res.json({ status: 'error', error})  
    }
   
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartById = await Cart.findByIdCart(cid);

       
        const total = cartById.products.reduce((accumulator, product) => ( accumulator + product.product.price ), 0);
    
        

        if (!cartById) {
            return res.status(404).json({ error: 'El carrito con el ID buscado no existe.' });
        } else {
            

            
            res.render('cart.handlebars', {
                cartById, 
                total,
                style: 'style.css',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error });
    }
});



router.post('/', async (req, res) => {
    try {
        await Cart.createCart()
        res.status(HTTP_RESPONSES.Created).json({ status: 'success', payload: 'Cart created'})
    } catch (error) {
        res.json({ status: 'error', error})
    }
   
})

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params
        const { stock } = req.body
    const productUpdated = await Cart.updatedProductStock(cid, pid, stock)
    if (productUpdated.status === 'success') {
        res.json({ status: 'success', payload: productUpdated });
    } else {
        res.json(productUpdated); 
    }
    } catch (error) {
        res.json({ status: 'error', error})
    }
    
})

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const  {products } = req.body
       
    const productUpdated = await Cart.updatedProductCart(cid, products)
    if (productUpdated.status === 'success') {
        res.json({ status: 'success', payload: productUpdated });
    } else {
        res.json(productUpdated); 
    }
    } catch (error) {
        res.json({ status: 'error', error})
    }
    
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { productid } = req.body

        const cart = await Cart.findCart({ _id: id })
        cart.products.push({product: productid})

        

         const cartUpdated = await Cart.updatedCart({_id: id}, cart)
        res
        .json({status: 'succes', payload: cartUpdated})
       } catch (error) {
        console.log(error);
        res
        
        .json({ status: 'error', error})
       }
 })

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params
    const productRemoved = await Cart.delateOneProductInCart(cid, pid)
    if (productRemoved.status === 'success') {
        res.json({ status: 'success', payload: productRemoved });
    } else {
        res.json(productRemoved); 
    }
    } catch (error) {
        res.json({ status: 'error', error})
    }
    
})

router.delete('/:cid', async (req, res) =>{
    try {
        const { cid } = req.params
        const allProductsRemoved = await Cart.delateAllProductsInCart(cid)
       
        if (allProductsRemoved.status === 'success') {
            res.json({ status: 'success', payload: allProductsRemoved });
        } else {
            res.json(allProductsRemoved); 
        }

    } catch (error) {
        res.json({ status: 'error', error})
    }
})
module.exports = router