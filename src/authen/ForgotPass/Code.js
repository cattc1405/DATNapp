import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Code = (props) => {
  const { navigation, route } = props;
  const { email } = route.params; // Lấy email từ tham số điều hướng
  const [code, setCode] = useState(['', '', '', '', '', '']); // 6 ô nhập mã
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  // Hàm xử lý khi người dùng nhập mã
  const handleCodeChange = (index, value) => {
    // Chỉ cho phép nhập số và giới hạn độ dài
    if (value.match(/^[0-9]*$/) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;

      // Tự động chuyển đến ô tiếp theo
      if (value && index < code.length - 1) {
        setTimeout(() => {
          inputs.current[index + 1].focus();
        }, 50);
      }

      // Tự động chuyển về ô trước đó nếu ô hiện tại bị xóa
      if (!value && index > 0) {
        setTimeout(() => {
          inputs.current[index - 1].focus();
        }, 50);
      }

      setCode(newCode);
    }
  };

  // Hàm xử lý xác thực mã OTP
  const handleVerifyCode = async () => {
    // Kiểm tra nếu mã nhập vào chưa đủ 6 chữ số
    if (code.join('').length < 6) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập mã xác thực 6 chữ số.');
      return;
    }

    setLoading(true);
    const verificationCode = code.join(''); // Chuyển mã nhập thành chuỗi

    try {
      // Lấy token từ AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }

      // Gọi API xác thực mã
      const response = await axios.post('https://app-datn-gg.onrender.com/api/v1/users/verify-otp', {
        code: verificationCode, // Gửi mã OTP
        email: email, // Gửi email vào body nếu API yêu cầu
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
      });

      console.log('Response from API:', response.data); // Ghi lại phản hồi từ API

      if (response.data.success) {
        Alert.alert('Thành công', response.data.message); // Thông báo thành công
        navigation.navigate('NewPass'); // Điều hướng tới màn hình thay đổi mật khẩu
      } else {
        Alert.alert('Lỗi', response.data.message); // Thông báo lỗi từ API
      }
    } catch (error) {
      console.error('Lỗi khi xác thực mã:', error.response ? error.response.data : error.message);
      Alert.alert('Lỗi', error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false); // Đặt trạng thái loading về false
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/Back.png')} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} />
      <Text style={styles.stepText}>Bước 2/3</Text>
      <View style={styles.imagePlaceholder}>
        <Image source={require('../../../assets/images/Img.png')} />
      </View>
      <Text style={styles.title}>Nhập mã xác thực</Text>
      <Text style={styles.description}>Mã xác thực đã được gửi đến email {email} của bạn.</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.codeInput}
            value={digit}
            onChangeText={value => handleCodeChange(index, value)}
            keyboardType="number-pad"
            maxLength={1} // Giới hạn độ dài nhập vào
            returnKeyType="next" // Hiển thị nút "Next" trên bàn phím
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode} disabled={loading}>
        <Text style={styles.verifyButtonText}>{loading ? 'Đang xác thực...' : 'Xác thực mã'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'nunitoSan',
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#E0F7EF',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
    fontFamily: 'nunitoSan',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
    fontFamily: 'nunitoSan',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginRight: 10,
  },
  verifyButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
});

export default Code;
