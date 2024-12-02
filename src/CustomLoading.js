import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text, Modal} from 'react-native';

const CustomLoading = ({visible, message = 'Loading...'}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loader: {
    width: 120,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default CustomLoading;
