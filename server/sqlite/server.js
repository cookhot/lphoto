const sqlite = require('./db')

const addComment = ({username = '', avatar = '', address = '', score = 0, time = Date.now(), detail = '', files = []}) => {
  // 参数判断
  return new Promise(async (resolve) => {
    const db = await sqlite()
    // db.run
    db.run(`insert into comment values('${username}', '${avatar}', '${address}', '${score}',
    '${time}', '${detail}', '${files.join(',')}')`, (err) => {
      if (err) throw err
      resolve('success')
    })
  })
}

const getAllComment = () => {
  return new Promise(async (resolve) => {
    const db = await sqlite()
    // db.run
    db.all(`select * from comment order by time desc`, (err, result) => {
      if (err) throw err
      resolve(result)
    })
  })
}

module.exports.addComment = addComment
module.exports.getAllComment = getAllComment
