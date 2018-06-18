// TODO 待做
const io = require('socket.io-client')

const socket = io('http://localhost:3008', {
  path: '/comment'
})

socket.on('message', (data) => {
  console.log(data)
})

module.exports = (comment) => {
  socket.emit('comment', comment)
}
