const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const app = express()
const PORT = 3000
const SESSION_SECRET = 'secret'

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.use(routes)
app.listen(PORT, () => {
  console.log(`app listening on localhost: ${PORT}`)
})