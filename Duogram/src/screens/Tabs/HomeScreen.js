
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Anniversary' },
    { id: '2', title: 'First Date' },
  ]);
  const [newEvent, setNewEvent] = useState('');

  const addEvent = () => {
    if (!newEvent.trim()) return;
    setEvents([{ id: Date.now().toString(), title: newEvent }, ...events]);
    setNewEvent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Events</Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.eventBox}>
            <Text style={styles.eventText}>{item.title}</Text>
          </View>
        )}
        style={{ flexGrow: 0 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Add event..."
        value={newEvent}
        onChangeText={setNewEvent}
      />
      <TouchableOpacity style={styles.button} onPress={addEvent}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  eventBox: {
    backgroundColor: '#EFEFEF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventText: { fontSize: 18 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 16
  },
  button: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
