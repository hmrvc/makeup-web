const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// },
// (req, email, password, cb) => {
//   User.findOne({ where: { email } })
//     .then(user => {
//       if (!user) return cb(null, false, req.flash('error_message', '帳號或密碼輸入握物!'))
//       bcrypt.compare(password, user.password).then(res => {
//         if(!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
//         return cb(null, user)
//       })
//     })
// }
// ))

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, cb) => {
  const user = await User.findOne({ where: { email } })
  if (!user)  return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
  const isCorrect = await bcrypt.compare(password, user.password)
  if (!isCorrect) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
  return cb(null, user)
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport