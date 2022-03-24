const express = require('express')
const router = express.Router()

//載入controller
const productController = require('../controllers/product-controller')

router.get('/products/:id', productController.getProduct)
router.get('/products', productController.getProducts)
router.use('/', (req, res) =>{
  res.redirect('/products')
})

module.exports = router