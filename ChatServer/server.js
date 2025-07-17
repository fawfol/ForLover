const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const admin = require('firebase-admin');
const fs = require('fs');

// firebase service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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
let users = {};

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('join', async (userId) => {
    users[socket.id] = userId;
    console.log(`👤 ${userId} joined`);

    try {
      const sent = await db.collection('messages')
        .where('sender', '==', userId)
        .get();

      const received = await db.collection('messages')
        .where('receiver', '==', userId)
        .get();

      const history = [];

      sent.forEach(doc => history.push(doc.data()));
      received.forEach(doc => history.push(doc.data()));

      socket.emit('chat_history', history);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  });

  socket.on('send_message', async (data) => {
    console.log(`${data.sender} → ${data.receiver}: ${data.message}`);
    io.emit('receive_message', data);

    try {
      await db.collection('messages').add({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: data.timestamp,
      });
    } catch (err) {
      console.error('Error saving to Firebase:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
    delete users[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Duogram server running at http://localhost:${PORT}`);
});
