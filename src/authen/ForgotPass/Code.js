import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Code = (props) => {
  const { navigation } = props;
  const [code, setCode] = useState(['', '', '', '', '', '']); // 6 ô nhập mã
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;

    // Tự động chuyển tới ô nhập tiếp theo
    if (value && index < code.length - 1) {
      setTimeout(() => {
        inputs.current[index + 1].focus();
      }, 50);
    }

    // Tự động quay lại ô nhập trước đó nếu ô hiện tại rỗng
    if (!value && index > 0) {
      setTimeout(() => {
        inputs.current[index - 1].focus();
      }, 50);
    }

    setCode(newCode);
  };

  const handleVerifyCode = async () => {
    // Kiểm tra xem mã có đủ 6 ký tự không
    if (code.join('').length < 6) {
      Alert.alert('Warning', 'Please enter a 6-digit verification code.');
      return;
    }

    setLoading(true);
    const verificationCode = code.join('');
    try {
      const response = await axios.post('https://app-datn-gg.onrender.com/api/v1/verify-code', {
        code: verificationCode,
      });

      // Kiểm tra nếu response có thuộc tính success
      if (response.data.success) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('NewPass'); // Chuyển tới màn hình đổi mật khẩu
      } else {
        Alert.alert('Error', response.data.message); // Thông báo nếu mã không đúng
      }
    } catch (error) {
      console.error('Error details:', error.response); // Xem chi tiết lỗi
      const errorMessage = error.response?.data?.message || 'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại!';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://app-datn-gg.onrender.com/api/v1/resend-code', {
        // Bạn có thể cần gửi số điện thoại hoặc thông tin khác ở đây
      });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Resend error:', error);
      Alert.alert('Error', 'Không thể gửi lại mã xác thực. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ForgetPass')}>
            <Image source={require('../../../assets/images/Back.png')} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 2/3</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Image source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>

      <Image source={require('../../../assets/images/Mobile.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Enter the Verification Code</Text>
      <Text style={styles.description}>
        Enter the 6-digit number that we sent{"\n"} to (+1) 1-541-754-3010.
      </Text>

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={value => handleCodeChange(index, value)}
            ref={input => (inputs.current[index] = input)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleVerifyCode} disabled={loading}>
        <Text style={styles.nextButtonText}>{loading ? 'Verifying...' : 'Next Step'}</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn't Receive Anything? 
        <Text style={styles.resendLink} onPress={handleResendCode}> Resend Code</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#989DA3',
    marginLeft: 10,
    marginLeft: 110,
  },
  closeButton: {
    padding: 10,
  },
  image: {
    width: 256,
    height: 214,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#989DA3',
    fontWeight: '300',
    marginBottom: 10,
    lineHeight: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: '10%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#E1E0E0',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    marginHorizontal: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  resendText: {
    textAlign: 'center',
    color: '#989DA3',
    fontSize: 14,
  },
  resendLink: {
    color: '#F55F44',
    fontWeight: 'bold',
  },
});

export default Code;
