const { Product } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const productController = {
  getProducts: (req, res, next) => {
    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Product.findAndCountAll({
      limit, 
      offset,
      raw: true
    }).then(products => {
      const data = products.rows.map(p => ({
        ...p,
        description: p.description ? p.description.substring(0, 50) : null
      }))
      return res.render('products', {
        products: data,
        pagination: getPagination(limit, page, products.count)
      })
    })
    .catch(err => next(err))
  },
  getProduct: (req, res, next) => {
    return Product.findByPk(req.params.id, {
      raw: true
    }).then(product => {
      if (!product) throw new Error("Product didn't exist!")
      res.render('product', { product})
    })
    .catch(err => next(err))
  }
}

module.exports = productController