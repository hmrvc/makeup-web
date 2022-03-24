module.exports = {
  generalErrorHandler (err, req, res, next) {
    // 判斷 err 是否為 ERROR 物件
    if (err instanceof Error) {
      req.flash('error_messages', `${err.name}: ${err.message}`)
    } else {
      req.flash('error_messages', `${err}`)
    }
    res.redirect('back')
    next(err)
  }
}