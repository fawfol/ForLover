import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

// Change this to your local IP if using a real device
const socket = io("http://192.168.11.29:3000"); 

export default function ChatScreen({username}) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Example: join with hardcoded user ID
    socket.emit('join', 'user1');

    socket.on('receive_message', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => socket.disconnect();
  }, [username]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const messageData = {
      sender: username,
      receiver: 'user2',
      message,
    };
    socket.emit('send_message', messageData);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chat}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const isSentByMe = item.sender === username;
          return (
            <View
              style={[
                styles.chatBubble,
                isSentByMe ? styles.sentBubble : styles.receivedBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          );
        }}
        
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="メッセージを入力 . . ."
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F9E6EC' },
  chatBubble: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  
  sentBubble: {
    backgroundColor: '#DCF8C6', // WhatsApp green-ish
    alignSelf: 'flex-end',
  },
  
  receivedBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  
  input: {
    borderColor: '#aa336a',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
});
