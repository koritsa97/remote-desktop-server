const express = require('express');
require('dotenv').config();
const { Server } = require('socket.io');
const http = require('http');

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on('control', (coords) => {
    socket.broadcast.emit('control', coords);
  });

  socket.on('click', (coords) => {
    socket.broadcast.emit('click', coords);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log('Server started');
});
