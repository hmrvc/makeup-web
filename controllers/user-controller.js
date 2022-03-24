const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: async(req, res, next) => {
    try {
      if (req.body.password !== req.body.passwordCheck) throw new Error('Password do not match!')
      const user = await User.findOne({ where: { email: req.body.email } })
      if (user) throw new Error('Email already exists!')
      const hash = await bcrypt.hash(req.body.password, 10)
      const newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      res.redirect('/signin')
    } catch(err){
      next(err)
    }
  },
  signInPage: (req, res, next) => {
    res.render('signin')
  },
  signIn: (req, res, next) => {
    req.flash('success_messages', '成功登入')
    res.redirect('/products')
  },
  logout: (req, res, next) => {
    req.flash('success_messages', '成功登出')
    req.logout()
    res.redirect('/signin')
  }
}

module.exports = userController