import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Code = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('ForgetPass')}>
          <Image
            source={require('../../../assets/images/Back.png')} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 2/3</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Image
            source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../assets/images/Mobile.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter the Verification Code</Text>
      <Text style={styles.description}>
        Enter the 4 digit number that we sent to mafalda123@gmail.com.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
      </View>

      {/* Nút "Next Step" */}
      <TouchableOpacity style={styles.nextButton}
        onPress={() => navigation.navigate('NewPass')}>
        <Text style={styles.nextButtonText}>Next Step</Text>

      </TouchableOpacity>

      {/* Liên kết gửi lại mã */}
      <Text style={styles.resendText}>
        Didn't Receive Anything? <Text style={styles.resendLink}>Resend Code</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 24,
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },
  resendLink: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default Code