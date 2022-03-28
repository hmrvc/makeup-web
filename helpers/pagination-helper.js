const getOffset = (limit = 10, page = 1) => (page - 1) * limit
const getPagination = (limit = 10, page = 1, total = 50) => {
  const totalPage = Math.ceil(total / limit)
  // 總共資料數total 每頁顯示幾筆資料limit 目前頁面page 每次顯示幾個分頁 pagLimit
  const pagLimit = 10 // 依次顯示10個分頁
  const first = 1 // 第一頁
  const last = totalPage // 最後一頁
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1).slice(page - 1, page + pagLimit - 1)
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
  const next = currentPage + 1 > totalPage ? totalPage : currentPage + 1
  return {
    pages,
    totalPage,
    currentPage,
    prev,
    next,
    first,
    last
  }
}

module.exports = {
  getOffset,
  getPagination
}