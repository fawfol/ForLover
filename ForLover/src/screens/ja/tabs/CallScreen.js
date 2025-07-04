import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../constants/theme'; // adjust path if needed

export default function CallScreenJA() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContent}>
        {/* Voice and Video Call Buttons */}
        <View style={styles.topButtons}>
          <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="call" size={24} color={theme.colors.white} />
            <Text style={styles.buttonText}>音声通話</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="videocam" size={24} color={theme.colors.white} />
            <Text style={styles.buttonText}>ビデオ通話</Text>
          </TouchableOpacity>
        </View>

        {/* Karaoke Section */}
        <View style={[styles.box, { backgroundColor: theme.colors.accent }]}>
          <Text style={styles.boxTitle}>🎤 カラオケモード</Text>
        </View>

        {/* Game Section */}
        <View style={[styles.box, { backgroundColor: theme.colors.gold }]}>
          <Text style={styles.boxTitle}>🎮 ゲームセクション</Text>
        </View>

        {/* Extra Options */}
        <View style={[styles.box, { backgroundColor: theme.colors.white }]}>
          <Text style={[styles.boxTitle]}>➕ その他のオプション</Text>
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
    marginBottom: 20,
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
    fontSize: theme.font.bodySize,
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
    fontSize: 18,
    color: theme.colors.textDark,
    fontWeight: 'bold',
  },
});
