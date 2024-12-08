import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {verifyEmail} from '../../apiClient';
const Code1 = props => {
  const {navigation} = props;
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to hold OTP inputs
  // Handler for input change
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text; // Update the specific index
    setOtp(newOtp);
  };

  // Combine the OTP array into a single string
  const combinedOtp = otp.join('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/Back.png')} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 9/10</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate('Login')}>
          <Image source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../assets/images/Mobile.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter the Verification Code</Text>
      <Text style={styles.description}>
        {`Enter the 4 digit number that we sent to ${email}`}
      </Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={text => handleOtpChange(text, index)} // Handle input changes
          />
        ))}
      </View>

      {/* Nút "Next Step" */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          verifyEmail(email, combinedOtp, password);

          navigation.navigate('Login');
        }}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>

      {/* Liên kết gửi lại mã */}
      <Text style={styles.resendText}>
        Didn't Receive Anything?{' '}
        <Text style={styles.resendLink}>Resend Code</Text>
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
    fontFamily: 'nunitoSan',
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
    fontFamily: 'nunitoSan',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
    fontFamily: 'nunitoSan',
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
    shadowOffset: {width: 0, height: 2},
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
    fontFamily: 'nunitoSan',
  },
  resendText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    fontFamily: 'nunitoSan',
  },
  resendLink: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
});

export default Code1;
