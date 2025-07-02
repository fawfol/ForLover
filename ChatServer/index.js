let chatHistory = []; // Store messages

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    console.log(`${username} joined`);
    socket.username = username;

    //Send existing chat history to the joining user
    socket.emit('chat_history', chatHistory);
  });

  socket.on('send_message', (data) => {
    console.log('Message received:', data);

    chatHistory.push(data); // Save to history

    // Send to all (or implement receiver logic)
    io.emit('receive_message', data);
  });
});
