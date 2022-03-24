const { Product } = require('../models')
const productController = {
  getProducts: (req, res) => {
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
  }
}

module.exports = productController