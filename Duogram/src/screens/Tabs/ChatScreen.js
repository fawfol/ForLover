//Duogram/src/screens/Tabs/ChatScreen.js
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../../firebase';

const db = getFirestore();

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [pairCode, setPairCode] = useState(null);
  const user = auth.currentUser;

  //1.Load the user's pair code on mount
  useEffect(() => {
    async function getPairCode() {
      const docSnap = await db.collection('users').doc(user.uid).get();
      if (docSnap.exists()) setPairCode(docSnap.data().pairCode);
    }
    getPairCode();
  }, [user]);

  // 2.Real-time listener on our pair's chat messages
  useEffect(() => {
    if (!pairCode) return;
    const messagesRef = collection(db, 'pairs', pairCode, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesFirestore = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
          user: {
            _id: data.sender,
            name: data.sender === user.uid ? "You" : "Partner",
            avatar: 'https://ui-avatars.com/api/?name='+(data.sender===user.uid ? "You" : "Partner"),
          }
        }
      });
      setMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, [pairCode]);

  // 3.Send new message to Firestore
  const onSend = useCallback(async (msgs = []) => {
    if (!pairCode) return;
    const { text } = msgs[0];
    await addDoc(collection(db, 'pairs', pairCode, 'messages'), {
      text,
      sender: user.uid,
      timestamp: new Date()
    });
  }, [pairCode, user]);

  return (
    <GiftedChat
      messages={messages}
      onSend={msgs => onSend(msgs)}
      user={{ _id: user.uid, name: "You" }}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#007AFF' },
            left: { backgroundColor: '#E5ECF2' }
          }}
        />
      )}
      showUserAvatar
      alwaysShowSend
      placeholder="Type a message..."
    />
  );
}
