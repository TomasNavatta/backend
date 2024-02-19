const { Router } = require('express')
const productDao = require('../dao/mongo/product-dao.mongo')
const HTTP_RESPONSES = require('../constants/http_responses')
const Product = require('../model/product.model')

const router = Router()

const ProductManager = new productDao()


router.get('/', async (req, res) => {
    try {
        const {limit, name, sort, page = 1} = req.query

        const limitFilter = limit ? parseInt(limit): 10

      
        
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await Product.paginate({ name: name ? { $eq: name } : { $exists: true } }, {page, limit: limitFilter, sort: sort === 'desc' ? { price: - 1} : sort === 'asc' ? { price: 1} : undefined, lean: true  })
        const products = docs
         res.render('home.handlebars',
         {
           products,
           hasPrevPage,
           hasNextPage,
           nextPage,
           prevPage,
           limit,
           sort,
           style: 'style.css'
        })
       

    } catch (error) {
        console.log('error:', error);
        res
        .status(HTTP_RESPONSES.Internal_Server_Error)
        .json({ status: 'error', error})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const{ id } = req.params
        const productsById = await ProductManager.findByIdDao({ _id: id })
        res.json({status: 'success', payload: productsById})
    } catch (error) {
        res
        .status(HTTP_RESPONSES.Bad_Request)
        .json({ status: 'error', error})
    }
})


router.post('/', async (req, res) => {
    try {
        const { name, description, price, thumbnail, stock } = req.body

        const newProductInfo = {
            name, 
            description,
            price,
            thumbnail,
            stock,
            createAt: new Date(),
            updateAt: new Date()
        }
        const newProduct = await ProductManager.createOneDao(newProductInfo)
        res
        .status(HTTP_RESPONSES.Created)
        .json({status: 'success', payload: newProduct})
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_RESPONSES.Internal_Server_Error)
        .json({ status: 'error', error})
    }
})


router.put('/:id', async (req, res) => {
    try {
        const{ id } = req.params
        const { name, description, price, thumbnail, stock } = req.body
        if(!name || !description || !price || !stock) res.status(HTTP_RESPONSES.Bad_Request).json({ status: error, 'error': 'bad request' })
        const updatedProductInfo = {
            name, 
            description,
            price,
            thumbnail,
            stock,
            updateAt: new Date()
        }
        await ProductManager.updateOneDao({ _id: id, status: true}, updatedProductInfo)
        res
        .status(HTTP_RESPONSES.Created)
        .json({status: 'success', payload: 'Updated product'})
    } catch (error) {
        res
        .status(HTTP_RESPONSES.Bad_Request)
        .json({ status: 'error', error})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
         await ProductManager.updateOneDao({  _id: id }, { status: false })
        res.json({status: 'success', payload: 'Delated product'})
    } catch (error) {
        res
        .status(HTTP_RESPONSES.Internal_Server_Error)
        .json({ status: 'error', error})
    }
})

module.exports = router