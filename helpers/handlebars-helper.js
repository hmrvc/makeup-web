const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime') // 以目前時間差值方式顯示評論時間
dayjs.extend(relativeTime)
module.exports = {
  currentYear: () => dayjs().year(),
  relativeTimeFromNow: a => dayjs(a).fromNow(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}