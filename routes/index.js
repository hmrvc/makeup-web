const express = require('express')
const router = express.Router()

//載入controller
const productController = require('../controllers/product-controller')
//載入錯誤處理
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/products/:id', productController.getProduct)
router.get('/products', productController.getProducts)
router.use('/', (req, res) =>{
  res.redirect('/products')
})
router.use('/', generalErrorHandler)

module.exports = router