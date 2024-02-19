const { Router } = require('express')
const CartDao = require('../dao/mongo/cart-dao.mongo')

const router = Router()

const Cart = new CartDao()


router.get('/', async (req, res) => {
   try {
    const carts = await Cart.getAll({}, {__v: 0})
    res.json({status: 'succes', payload: carts})
   } catch (error) {
    res
    .json({ status: 'error', error})
   }
})

//  create a new cart
router.post('/', async (req, res) => {
    const newCart = {
        
        products: [],
    };

    const cart = await Cart.createOne(newCart);
    res.json({ status: 'success', payload: cart });
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { productid } = req.body

        const cart = await Cart.findOneDao({ _id: id })
        cart.products.push({product: productid})

        

         const cartUpdated = await Cart.updatedOneDao({_id: id}, cart)
        res
        .json({status: 'succes', payload: cartUpdated})
       } catch (error) {
        console.log(error);
        res
        
        .json({ status: 'error', error})
       }
 })

// // filtro de carrito por id
// router.get('/:cid', (req, res) => {
//     const { cid } = req.params;
//     const cart = carts.find(cart => cart.id == cid);

//     if (!cart) 
//         return res.status(404).json({ error: 'Cart not found' });

//         res.json({ cart });
// });

// //  agregar un producto al carrito por ID
// router.post('/:cid/product/:pid', (req, res) => {
//     const { cid } = req.params;
//     const { pid } = req.params;
//     const cart = carts.find(cart => cart.id == cid);

//     if (!cart) {
//         res.status(404).json({ error: 'Cart not found' });
//     } else {
//         const existingProduct = cart.products.find(p => p.product.id == pid);

//         if (existingProduct) {
//             // Si el producto ya existe, incrementa la cantidad
//             existingProduct.quantity += 1;
//         } else {
//             // Si el producto no existe, agrégalo al carrito
//             const newProduct = {
//                 product: { id: pid },
//                 quantity: 1,
//             };
//             cart.products.push(newProduct);
//         }

//         res.json({ status: 'success', cart });
//     }
     
       
    
// });

module.exports = router