const sqlite3 = require('sqlite3')
const path = require('path')

const promise = new Promise((resolve) => {
  const db = new sqlite3.Database(path.resolve(__dirname, 'tmp/db.db'), (err) => {
    if (err) throw err
    console.log('数据库启动成功')
    resolve(db)
  })
})

module.exports = () => {
  return promise
}
