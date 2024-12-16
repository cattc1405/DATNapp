import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { setPassword } from '../../redux/slice/userSlice';
import CustomHeaderSignup from './CustomHeaderSignup';
import CustomAlert from '../../CustomAlert';
import CustomSuccessAlert from '../../CustomSuccessAlert';


const YourPass = () => {
  const [inputValue, setInputValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');
  const [clickable, setClickable] = useState(true);
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertSuccessVisible, setIsAlertSuccessVisible] = useState(false);

  const handleOk = () => {
    setIsAlertVisible(false);
    setClickable(true);
  };
  const handleSuccessOk = () => {
    navigation.navigate('Phone')
  }
  const dispatch = useDispatch(); // Get the dispatch function from Redux store
  const handleTextChange = text => {
    setInputValue(text);
  };
  const handleConfirmChange = text => {
    setConfirmValue(text);
  };
  const checkPasswordMatch = () => {
    setClickable(false);
    if (inputValue.length < 8) {
      setAlertTitle('Mật khẩu quá ngắn!');
      setAlertMessage('Vui lòng nhập mật khẩu từ 8 ký tự trở lên!');
      setIsAlertVisible(true);
    } else  if (inputValue.length > 20) {
      setAlertTitle('Mật khẩu quá dài!');
      setAlertMessage('Vui lòng nhập mật khẩu từ 20 ký tự trở xuống!');
      setIsAlertVisible(true);
    } else if ( /[A-Z]/.test(inputValue)<1) {
      setAlertTitle('Thêm ký tự in hoa nhé!');
      setAlertMessage('Vui lòng thêm ít nhất một ký tự in hoa vào mật khẩu!');
      setIsAlertVisible(true);
    } else if ( /[0-9]/.test(inputValue)<1) {
      setAlertTitle('Thêm số vào nhé!');
      setAlertMessage('Vui lòng thêm ít nhất một chữ số vào mật khẩu!');
      setIsAlertVisible(true);
    } else if (  /[!@#$%^&*(),.?":{}|<>]/.test(inputValue)<1) {
      setAlertTitle('Thêm ký tự đặt biệt nhé!');
      setAlertMessage('Vui lòng thêm ít nhất một ký tự đặc biệt vào mật khẩu!');
      setIsAlertVisible(true);
    } else
    if (inputValue != confirmValue) {
      setAlertTitle('Mật khẩu nhập lại không khớp!');
      setAlertMessage('Mật khẩu nhập lại của bạn không giống nhau!');
      setIsAlertVisible(true);
    } else {
      dispatch(setPassword(inputValue));
      setAlertTitle('Thành công!');
      setAlertMessage('Hãy nhớ mật khẩu bạn vừa tạo nhé!');
      setIsAlertSuccessVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeaderSignup
        stepText="Step 3/6"
        onBackPress={() => navigation.goBack()}
        onClosePress={() => navigation.navigate('Login')}
      />
     
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
      <Image
        source={require('../../../assets/images/Img2.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>Set Your Password</Text>

      {/* Mô tả */}
      <Text style={styles.description}>
        In order to keep your account safe you need to create a strong password.
      </Text>


      <View style={styles.inputNameView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputView}
            secureTextEntry={true}
            placeholder="Example: John Smith"
            placeholderTextColor="rgb(177, 189, 199)"
            onChangeText={handleTextChange}
            value={inputValue}
          />
          <Text style={styles.inputLabel}>Password</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputView}
            placeholder="Example: John Smith"
            placeholderTextColor="rgb(177, 189, 199)"
            secureTextEntry={true}
            onChangeText={handleConfirmChange}
            value={confirmValue}
          />
          <Text style={styles.inputLabel}>confirm password</Text>
        </View>

        <Text style={styles.containText}>Your password must contain</Text>
        <View style={styles.checkView}>
          <Image
            style={styles.containCheck}
            source={
              inputValue.length >= 8 && inputValue.length <= 20
                ? require('../../../assets/images/orangeChecked.png')
                : require('../../../assets/images/grayNotChecked.png')
            }
          />
          <Text style={styles.atLeastText}>Between 8 and 20 characters</Text>
        </View>
        <View style={styles.checkView}>
          <Image
            style={styles.containCheck}
            source={
              /[A-Z]/.test(inputValue)
                ? require('../../../assets/images/orangeChecked.png')
                : require('../../../assets/images/grayNotChecked.png')
            }
          />
          <Text style={styles.atLeastText}>1 upper case letter</Text>
        </View>
        <View style={styles.checkView}>
          <Image
            style={styles.containCheck}
            source={
              /[0-9]/.test(inputValue)
                ? require('../../../assets/images/orangeChecked.png')
                : require('../../../assets/images/grayNotChecked.png')
            }
          />
          <Text style={styles.atLeastText}>1 or more numbers</Text>
        </View>
        <View style={styles.checkView}>
          <Image
            style={styles.containCheck}
            source={
              /[!@#$%^&*(),.?":{}|<>]/.test(inputValue)
                ? require('../../../assets/images/orangeChecked.png')
                : require('../../../assets/images/grayNotChecked.png')
            }
          />
          <Text style={styles.atLeastText}>1 or more special characters</Text>
        </View>
      </View>

      {/* Nút "Next Step" */}
      <TouchableOpacity style={styles.nextButton} onPress={checkPasswordMatch}
      disabled={clickable==false}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  atLeastText: {
    paddingLeft: 10,
    fontSize: 13,
    fontWeight: '500',
    
    // fontFamily: 'nunitoSan',
  },
  containCheck: {
    width: 17,
    height: 17,
  },
  checkView: {
    width: '70%',
    height: 25,
    marginLeft: '10%',
    marginTop: '1.2%',
    marginBottom: '-1%',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  containText: {
    marginLeft: '10%',
    fontWeight: '700',
    fontFamily: 'nunitoSan',
    textTransform: 'uppercase',
    fontSize: 13,
    marginTop: '8%',
    color: '#989DA3',
  },
  inputView: {
    paddingHorizontal: 25,
    color: 'black',
    fontWeight: '400',
  },
  inputLabel: {
    textTransform: 'uppercase',
    position: 'absolute',
    fontFamily: 'nunitoSan',
    left: 20,
    fontWeight: '700',
    color: '#F55F44',
    top: -11,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: '10%',
    width: '80%',
    marginLeft: '10%',
    marginBottom: '-4%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1.8,
    borderColor: 'rgb(211, 222, 232)',
  },

  checkedgenderText: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },

  checkedBlank: {
    width: '20%',
    marginLeft: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  genderView: {
    width: '45%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  inputNameView: {
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    height: 320,
  },
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
    fontFamily: 'nunitoSan',
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
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 20,
  },
  // inputContainer: {
  //   marginBottom: 20,
  // },
  // inputLabel: {
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   color: '#FF6B6B',
  //   marginBottom: 10,
  // },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 18,
  },
  iconButton: {
    padding: 10,
  },
  passwordRequirements: {
    marginBottom: 20,
  },
  requirementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requirement: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
});

export default YourPass;
