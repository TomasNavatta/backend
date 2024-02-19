const { Router } = require('express')
const HTTP_CONSTANTS = require('../constants/http_responses')
const ProductDao = require('../dao/mongo/product-dao.mongo')
const ProductDaoFs = require('../dao/fs/product-dao.fs')

const router = Router()

 const Product = new ProductDao()
// const Product = new ProductDaoFs()

router.get('/', async (req, res) => {
   try {
    const products = await Product.getAll({status: true})
    res.json({status: 'succes', payload: products})
   } catch (error) {
    res
    .status(HTTP_CONSTANTS.Internal_Server_Error)
    .json({ status: 'error', error})
   }
})

router.get('/:pid', async (req, res) => {
    try {
    const { pid } = req.params
    const products = await Product.findOneDao({_id: pid})
     res.json({status: 'succes', payload: products})
    } catch (error) {
     res
     .status(HTTP_CONSTANTS.Internal_Server_Error)
     .json({ status: 'error', error})
    }
 })

 router.post('/', async (req, res) => {
    try {
        const { name, description, price} = req.body

        const newProductInfo = {
            name,
            description,
            price,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const newProduct = await Product.createOne(newProductInfo)
        res
        .status(HTTP_CONSTANTS.Created)
        .json({status: 'succes', payload: 'Product created'})
       } catch (error) {
        console.log(error);
        if(code === 11000){
            res.status(HTTP_CONSTANTS.Bad_Request).json({ status: 'error', error: 'Email existed'})
        }
        res
        .status(HTTP_CONSTANTS.Internal_Server_Error)
        .json({ status: 'error', error})
       }
 })

 router.put('/:pid', async (req, res) => {
    try {
    const { pid } = req.params
    const { name, description, price} = req.body

    if(!name || !description || !price ) return res.status(HTTP_CONSTANTS.Bad_Request).json({ status: error, error: 'bad request'})

    const newProductUpdated = {
        name,
        description,
        price,
        updatedAt: new Date()
    }

    const existingProduct = await Product.findOneDao({ _id: pid, status: true });

    if (!existingProduct) {
        return res.status(HTTP_CONSTANTS.Bad_Request).json({ status: 'error', error: 'Product not found or status is false' });
    }

     await Product.updatedOneDao({_id: pid, status: true}, newProductUpdated)

     res
     .status(HTTP_CONSTANTS.Created)
     .json({status: 'succes', payload: 'Product updated'})
    } catch (error) {
     res
     .status(HTTP_CONSTANTS.Bad_Request)
     .json({ status: 'error', error})
    }
 })

 router.delete('/:pid', async (req, res) => {
    try {
    const { pid } = req.params
    await Product.updatedOneDao({_id: pid}, {status: false})
     res.json({status: 'succes', payload: 'Product delated'})
    } catch (error) {
     res.status(HTTP_CONSTANTS.Internal_Server_Error).json({ status: 'error', error})
    }
 })

module.exports = router