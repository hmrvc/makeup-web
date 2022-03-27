const { Favorite, User, Product } = require('../models')
const favoriteController = {
  addFavorite: async (req, res, next) => {
    const productId = req.params.id
    const favorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    })
    if (favorite) throw new Error("You alraedy favorited this product!")
    const favorited = await Favorite.create({
      userId: req.user.id,
      productId
    })
    res.redirect('back')
  },
  deleteFavorite: async (req, res, next) => {
    try {
      const productId = req.params.id
      const favorite = await Favorite.findOne({
        where: {
          userId: req.user.id,
          productId
        }
      })
      if (!favorite) throw new Error("You haven't favorite this product!")
      const removeFavorite = await favorite.destroy()
      res.redirect('back')
    } catch(err) {
      next(err)
    }
  }
}
module.exports = favoriteController