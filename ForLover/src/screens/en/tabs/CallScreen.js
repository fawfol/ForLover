import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../constants/theme';

export default function CallScreenJA() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContent}>
        <View style={styles.topButtons}>
          <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="call" size={24} color={theme.colors.white} />
            <Text style={styles.buttonText}>Voice Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="videocam" size={24} color={theme.colors.white} />
            <Text style={styles.buttonText}>Video Call</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { backgroundColor: theme.colors.accent }]}>
          <Text style={styles.boxTitle}>🎤 Karaoke Mode</Text>
        </View>

        <View style={[styles.box, { backgroundColor: theme.colors.gold }]}>
          <Text style={styles.boxTitle}>🎮 Game Section</Text>
        </View>

        <View style={[styles.box, { backgroundColor: theme.colors.white }]}>
          <Text style={[styles.boxTitle]}>➕ Other options</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pinkGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    width: '90%',
    alignItems: 'center',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  callButton: {
    width : '37%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: theme.font.bodyWeight,
    marginTop: 5,
  },
  box: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  boxTitle: {
    fontSize: 24,
    color: theme.colors.textDark,
    fontWeight: 'bold',
  },
});
