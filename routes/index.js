const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

//載入controller
const userController = require('../controllers/user-controller')
const productController = require('../controllers/product-controller')
const commentController = require('../controllers/comment-controller')
const favoriteController = require('../controllers/favorite-controller')

const { authenticated } = require('../middleware/auth')
//載入錯誤處理
const { generalErrorHandler } = require('../middleware/error-handler')
//註冊登入登出
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)
//使用者相關
router.get('/users/:id', authenticated, userController.getUser)
//產品相關
router.get('/products/:id', authenticated, productController.getProduct)
router.get('/products', authenticated, productController.getProducts)
//收藏相關
router.post('/favorite/:id', authenticated, favoriteController.addFavorite)
router.delete('/favorite/:id', authenticated, favoriteController.deleteFavorite)
//評論相關
router.delete('/comments/:id', authenticated, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)

router.use('/', (req, res) =>{
  res.redirect('/products')
})
router.use('/', generalErrorHandler)

module.exports = router