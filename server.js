const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('مستخدم متصل: ' + socket.id);

  socket.on('playVideo', (currentTime) => {
    socket.broadcast.emit('onPlay', currentTime);
  });

  socket.on('pauseVideo', () => {
    socket.broadcast.emit('onPause');
  });

  socket.on('seekVideo', (currentTime) => {
    socket.broadcast.emit('onSeek', currentTime);
  });
});

http.listen(PORT, () => {
  console.log(`السيرفر شغال على بورت ${PORT}`);
});
