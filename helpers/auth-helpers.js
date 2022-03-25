const getUser = req => {
  return req.user || null
}
const ensureAuthenticated = req => {
  return req.isAuthenticated() // passport提供的方法
}
module.exports = {
  getUser,
  ensureAuthenticated
}