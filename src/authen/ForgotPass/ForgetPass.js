import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {forgotPassword} from '../../apiClient'; // Import API client

const ForgetPass = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleSendCode = async () => {
    if (!selectedOption) {
      Alert.alert(
        'Phương thức chưa được chọn',
        'Vui lòng chọn phương thức liên hệ trước khi tiếp tục.',
        [{text: 'OK'}],
      );
    } else if (!email) {
      Alert.alert('Email không hợp lệ', 'Vui lòng nhập email của bạn.', [
        {text: 'OK'},
      ]);
    } else {
      try {
        await forgotPassword(email); // Gọi hàm quên mật khẩu với email
        Alert.alert('Thành công', 'Mã OTP đã được gửi đến email của bạn.', [
          {text: 'OK', onPress: () => navigation.navigate('Code', {email})}, // Truyền email ở đây
        ]);
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        // Kiểm tra mã lỗi và hiển thị thông báo phù hợp
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === 'User not found'
        ) {
          Alert.alert(
            'Lỗi',
            'Tài khoản email này chưa được đăng ký. Vui lòng kiểm tra lại hoặc đăng ký tài khoản.',
            [{text: 'OK'}],
          );
        } else {
          Alert.alert(
            'Lỗi',
            error.response
              ? error.response.data.message
              : 'Có lỗi xảy ra. Vui lòng thử lại.',
            [{text: 'OK'}],
          );
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/Back.png')} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}></TouchableOpacity>
      <Text style={styles.stepText}>Step 1/3</Text>
      <View style={styles.imagePlaceholder}>
        <Image source={require('../../../assets/images/Img.png')} />
      </View>
      <Text style={styles.title}>Quên mật khẩu?</Text>
      <Text style={styles.description}>
        Chọn một trong hai phương thức liên hệ để gửi mã OTP phục hồi mật khẩu
        của bạn.
      </Text>

      {/* Trường nhập email */}
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={
          selectedOption === 'mobile' ? styles.option : styles.optionUncheck
        }
        onPress={() => handleOptionSelect('mobile')}>
        <Text
          style={
            selectedOption === 'mobile'
              ? styles.optionText
              : styles.optionTextNonchecked
          }>
          1 QUA SỐ DI ĐỘNG
        </Text>
        <Text style={styles.subText}>
          Chúng tôi sẽ gửi mã OTP đến số điện thoại của bạn qua SMS.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          selectedOption === 'email' ? styles.option : styles.optionUncheck
        }
        onPress={() => handleOptionSelect('email')}>
        <Text
          style={
            selectedOption === 'email'
              ? styles.optionText
              : styles.optionTextNonchecked
          }>
          2 QUA EMAIL
        </Text>
        <Text style={styles.subText}>
          Chúng tôi sẽ gửi mã OTP đến email của bạn.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
        <Text style={styles.sendButtonText}>Gửi Mã Xác Thực</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  optionTextNonchecked: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    fontFamily: 'nunitoSan',
  },
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
  optionUncheck: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    opacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  option: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F55F44',
    fontFamily: 'nunitoSan',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'nunitoSan',
  },
  sendButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
});

export default ForgetPass;
