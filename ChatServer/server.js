const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;
const filePath = './chat_history.json';
let users = {};

// Helper: Save message to chat_history.json
function saveMessage(data) {
  let messages = [];
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath);
      messages = JSON.parse(raw);
    } catch (err) {
      console.error('Error reading chat history:', err);
    }
  }

  messages.push({
    timestamp: data.timestamp,
    sender: data.sender,
    receiver: data.receiver,
    message: data.message,
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Error writing chat history:', err);
  }
}

// Helper: Load chat history for a user
function loadHistoryForUser(userId) {
  if (!fs.existsSync(filePath)) return [];

  try {
    const raw = fs.readFileSync(filePath);
    const history = JSON.parse(raw);
    return history.filter(
      msg => msg.sender === userId || msg.receiver === userId
    );
  } catch (err) {
    console.error('Error loading chat history:', err);
    return [];
  }
}

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('join', (userId) => {
    users[socket.id] = userId;
    console.log(`${userId} joined`);

    const history = loadHistoryForUser(userId);
    socket.emit('chat_history', history);
  });

  socket.on('send_message', (data) => {
    console.log(`${data.sender} → ${data.receiver}: ${data.message}`);
    io.emit('receive_message', data);
    saveMessage(data);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
    delete users[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Duogram server running at http://localhost:${PORT}`);
});
