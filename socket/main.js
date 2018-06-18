const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/comment',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', (socket) => {
  console.log(socket)

  // 接收到评论成功的消息, 发布给客户端
  socket.on('comment', (data) => {
    // socket.send('message', data)
    io.sockets.emit('message', data)
  })
})




server.listen(3008);
