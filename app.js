const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { getUser } = require('./helpers/auth-helpers')
const handlebarsHelpers = require('./helpers/handlebars-helper')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs({ extname: 'hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)
app.listen(PORT, () => {
  console.log(`app listening on localhost: ${PORT}`)
})