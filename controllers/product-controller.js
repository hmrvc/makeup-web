const { Product } = require('../models')
const productController = {
  getProducts: (req, res, next) => {
    return Product.findAll({
      raw: true
    }).then(products => {
      const data = products.map(p => ({
        ...p,
        description: p.description ? p.description.substring(0, 50) : null
      }))
      return res.render('products', {
        products: data
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