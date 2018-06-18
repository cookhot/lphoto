const sqlite3 = require('sqlite3')
const path = require('path')

const db = new sqlite3.Database(path.resolve(__dirname, 'tmp/db.db'), (err) => {
  if (err) throw err
  db.run('drop table if exists comment', (err) => {
    if (err) throw err
    // 创建评论表
    db.run("create table comment(user varchar(20), avatar varchar(80), address varchar(200), score varchar(5), time varchar(30), " +
      "content varchar(240), img varchar(200))", (err, result) => {
    })
  })
})
