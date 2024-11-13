import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyOtp } from '../../apiClient';

const Code = (props) => {
  const { navigation, route } = props;
  const { email } = route.params; // Lấy email từ tham số điều hướng
  const [code, setCode] = useState(''); // Khởi tạo code là một chuỗi
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  // Hàm xử lý khi người dùng nhập mã
  const handleCodeChange = (index, value) => {
    // Chỉ cho phép nhập số và giới hạn độ dài
    if (value.match(/^[0-9]*$/) && value.length <= 1) {
      const newCode = code.split('');
      newCode[index] = value;

      console.log(newCode.join("")); // Log mã mới

      // Tự động chuyển đến ô tiếp theo
      if (value && index < 5) { // Chỉ chuyển đến ô tiếp theo nếu không phải ô cuối
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

      setCode(newCode.join("")); // Cập nhật chuỗi mã
    }
  };

  console.log(email, code);
  // Hàm xử lý xác thực mã OTP
  const handleVerifyCode = async () => {
    if (code.length < 6) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập mã xác thực 6 chữ số.');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(email, code); // Gọi API với chuỗi code
      console.log('Response from API:', response.data);

      navigation.navigate('NewPass',{email})

    } catch (error) {
      console.error('Lỗi khi xác thực mã:', error.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
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
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.codeInput}
            value={code[index] || ''} // Trả về ký tự tương ứng hoặc chuỗi rỗng
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
