const { Product, User, Comment } = require('../models')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { text, productId } = req.body
      
      if (!text) throw new Error('Comment text is required!')
      const user = await User.findByPk(req.user.id)
      const product = await Product.findByPk(productId)
      if (!user) throw new Error("User didn't exist!")
      if (!product) throw new Error("Product didn't exist!")
  
      const newComment = await Comment.create({
        text,
        userId: req.user.id,
        productId: productId
      })
      res.redirect(`/products/${productId}`)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = commentController