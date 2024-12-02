import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {verifyEmail} from '../../apiClient';
import CustomHeaderSignup from './CustomHeaderSignup';
import colors from '../../../assets/colors';
import CustomAlert from '../../CustomAlert';
import CustomSuccessAlert from '../../CustomSuccessAlert';

const Code1 = props => {
  const {navigation} = props;
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to hold OTP inputs
  const [isNextEnabled, setIsNextEnabled] = useState(false); // To track if "Next Step" button should be enabled
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertSuccessVisible, setIsAlertSuccessVisible] = useState(false);
  const handleOk = () => {
    setIsAlertVisible(false);
  };
  // Create refs for OTP inputs
  const inputRefs = useRef([]);
  const handleSuccessOk = () => {
    navigation.navigate('Login')
  }
  // Handler for input change
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text; // Update the specific index
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (text && index < otp.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Combine the OTP array into a single string
  const combinedOtp = otp.join('');

  // Effect to check if all OTP fields are filled
  useEffect(() => {
    // Enable the "Next Step" button if all OTP fields are filled
    const isComplete = otp.every(digit => digit.length === 1);
    setIsNextEnabled(isComplete);
  }, [otp]);

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyEmail(email, combinedOtp, password);
      if (response.success) {
        setAlertMessage('Chúc mừng bạn đã đăng ký tài khoản thành công!');
        setAlertTitle('Thành công!');
        setIsAlertVisible(true);
        // If OTP is correct, navigate to the Login screen
        navigation.navigate('Login');
      } else {
        // If OTP is incorrect, set the error message
        setAlertMessage('Bạn đã nhập sai OTP! \n Nếu không nhận được OTP, hãy gửi lại mã.');
        setAlertTitle('OTP không đúng!');
        setIsAlertSuccessVisible(true);
        setErrorMessage('Invalid OTP, please try again.');
      }
    } catch (error) {
      setAlertMessage('Bạn đã nhập sai OTP! \n Nếu không nhận được OTP, hãy gửi lại mã.');
      setAlertTitle('OTP không đúng!');
      setIsAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
       <CustomAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        // onCancel={handleCancel}
        onOk={handleOk}
      />
        <CustomSuccessAlert
        visible={isAlertSuccessVisible}
        title={alertTitle}
        message={alertMessage}
        // onCancel={handleCancel}
        onOk={handleSuccessOk}
      />
      <CustomHeaderSignup
        stepText="Step 6/6"
        onBackPress={() => navigation.goBack()}
        onClosePress={() => navigation.navigate('Login')}
      />

      <Image
        source={require('../../../assets/images/Mobile.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter the Verification Code</Text>
      <Text style={styles.description}>
        {`Enter the 6 digit number that we sent to ${email}`}
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
            ref={el => inputRefs.current[index] = el} // Assign ref to each input
          />
        ))}
      </View>

      {/* Error message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Nút "Next Step" */}
      <TouchableOpacity
        style={[styles.nextButton, !isNextEnabled && styles.nextButtonDisabled]}
        onPress={handleVerifyOtp} // Handle OTP verification on press
        disabled={!isNextEnabled}>
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
    backgroundColor: colors.whiteBgr,
  },
  image: {
    width: 250,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontWeight: '400',
    marginHorizontal: 20,
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
  nextButtonDisabled: {
    backgroundColor: '#ddd', // Disabled button color
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