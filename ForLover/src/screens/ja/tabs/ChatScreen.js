import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';

const socket = io("http://10.219.128.28:3000"); 

export default function ChatScreen({ username }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const receiver = 'user2'; // TODO: Make this dynamic if needed

  const flatListRef = useRef(null);

  // Time-based AES key generation using timestamp
  const generateTimeBasedKeyFromTimestamp = (userA, userB, timestamp) => {
    const [low, high] = [userA, userB].sort();
    const timeWindow = Math.floor(timestamp / 30000); // 30-second time window
    const keyBase = `${low}${high}${timeWindow}`;
    const hash = CryptoJS.SHA256(keyBase).toString();
    return hash.substring(0, 32);
  };

  const encryptAES = (plainText, key) => {
    return CryptoJS.AES.encrypt(
      plainText,
      CryptoJS.enc.Utf8.parse(key),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
  };

  const decryptAES = (cipherText, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(
        cipherText,
        CryptoJS.enc.Utf8.parse(key),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      return bytes.toString(CryptoJS.enc.Utf8) || '[Decryption Failed]';
    } catch (err) {
      return '[Invalid Message]';
    }
  };

  useEffect(() => {
    if (!username) return;

    socket.emit('join', username);

    //Load and decrypt history
    socket.on('chat_history', (history) => {
      const decrypted = history.map(msg => {
        const key = generateTimeBasedKeyFromTimestamp(msg.sender, msg.receiver, msg.timestamp);
        return {
          ...msg,
          message: decryptAES(msg.message, key),
        };
      });
      setChat(decrypted);
    });

    //Listen for new messages
    socket.on('receive_message', (data) => {
      const key = generateTimeBasedKeyFromTimestamp(data.sender, data.receiver, data.timestamp);
      const decryptedText = decryptAES(data.message, key);

      const decrypted = {
        ...data,
        message: decryptedText,
      };

      setChat(prev => {
        const updated = [...prev, decrypted];
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return updated;
      });
    });

    return () => {
      socket.off('chat_history');
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [username]);

  // Send message
  const sendMessage = () => {
    if (message.trim() === '') return;

    const timestamp = Date.now();
    const key = generateTimeBasedKeyFromTimestamp(username, receiver, timestamp);
    const encryptedMessage = encryptAES(message, key);

    const messageData = {
      sender: username,
      receiver,
      message: encryptedMessage,
      timestamp,
    };

    socket.emit('send_message', messageData);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 120}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <FlatList
            ref={flatListRef}
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
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          />

          <View style={styles.inputWrapper}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="メッセージを入力 ..."
              style={styles.input}
            />
            <Button title="送信" onPress={sendMessage} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9E6EC',
  },
  chatBubble: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 0,
    maxWidth: '80%',
  },
  sentBubble: {
    backgroundColor: '#DCF8C6',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 44,
    borderColor: '#aa336a',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});