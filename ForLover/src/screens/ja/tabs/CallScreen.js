// src/screens/ja/tabs/CallScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCall } from '../../../context/CallContext';
import { theme } from '../../../constants/theme';

export default function CallScreenJA() {
  const { callType, setCallType, joined, setJoined } = useCall();

  const handleCallStart = (type) => {
    setCallType(type);
    setJoined(true); // Simulate connection
  };

  const handleCallEnd = () => {
    setCallType(null);
    setJoined(false);
  };

  return (
    <View style={styles.container}>
      {callType ? (
        <View style={styles.callingBox}>
          <Text style={styles.callStatus}>
            {callType === 'voice' ? '音声通話中...' : 'ビデオ通話中...'}
          </Text>
          <Button title="通話終了" onPress={handleCallEnd} color={theme.colors.primary} />
        </View>
      ) : (
        <View style={styles.innerContent}>
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => handleCallStart('voice')}
            >
              <Ionicons name="call" size={24} color={theme.colors.white} />
              <Text style={styles.buttonText}>音声通話</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => handleCallStart('video')}
            >
              <Ionicons name="videocam" size={24} color={theme.colors.white} />
              <Text style={styles.buttonText}>ビデオ通話</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.boxTitle}>🎤 カラオケモード</Text>
          </View>

          <View style={[styles.box, { backgroundColor: theme.colors.gold }]}>
            <Text style={styles.boxTitle}>🎮 ゲームセクション</Text>
          </View>

          <View style={[styles.box, { backgroundColor: theme.colors.white }]}>
            <Text style={[styles.boxTitle]}>➕ その他のオプション</Text>
          </View>
        </View>
      )}
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
    width: '37%',
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
  callingBox: {
    backgroundColor: theme.colors.white,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  callStatus: {
    fontSize: 20,
    marginBottom: 20,
    color: theme.colors.textDark,
    fontWeight: 'bold',
  },
});
