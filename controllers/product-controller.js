const { Product, User, Comment } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const productController = {
  getProducts: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 9
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      
      const products = await Product.findAndCountAll({
        limit, 
        offset,
        raw: true
      })
      const favoritedProductId = req.user && req.user.FavoritedProducts.map(fp => fp.id)
      const data = products.rows.map(p => ({
          ...p,
          description: p.description ? p.description.substring(0, 50) : null,
          isFavorited: favoritedProductId.includes(p.id)
      }))
      res.render('products', {
          products: data,
          pagination: getPagination(limit, page, products.count)
      })
    } catch(err) {
      next(err)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: Comment, include: User },
          { model: User, as: 'FavoritedUsers'}
        ]
      })
      if (!product) throw new Error("Product didn't exist!")
      const isFavorited = product.FavoritedUsers.some(fu => fu.id === req.user.id)
      res.render('product', { product: product.toJSON(), isFavorited })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = productController