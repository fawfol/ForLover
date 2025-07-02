const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Allow requests from your mobile app (adjust origin if needed)
const io = new Server(server, {
  cors: {
    origin: '*', // For development, allow all. Replace with mobile app IP if needed.
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const PORT = process.env.PORT || 3000;

// Store connected users
let users = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a user joins with a name or ID
  socket.on('join', (userId) => {
    users[socket.id] = userId;
    console.log(`User ${userId} joined with socket ${socket.id}`);
  });

  // Handle message from one user to another
  socket.on('send_message', (data) => {
    console.log(`Message from ${data.sender} to ${data.receiver}: ${data.message}`);
    // Broadcast message to all (or could use rooms/private logic)
    io.emit('receive_message', data);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`✅ Chat server running on http://localhost:${PORT}`);
});
