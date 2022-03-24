const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

//載入controller
const userController = require('../controllers/user-controller')
const productController = require('../controllers/product-controller')
//載入錯誤處理
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/products/:id', productController.getProduct)
router.get('/products', productController.getProducts)
router.use('/', (req, res) =>{
  res.redirect('/products')
})
router.use('/', generalErrorHandler)

module.exports = router