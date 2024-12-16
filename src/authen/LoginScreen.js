import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {
  loginUser,
  loginUserGoogle,
  loginUserFacebook,
} from '../redux/slice/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'; // Firebase Auth package
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next'; // Facebook SDK imports
import CustomAlert from '../CustomAlert';
import CustomLoading from '../CustomLoading';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Bin123456');
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status); // Accessing auth status from the Redux store
  const error = useSelector(state => state.auth.error);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const authStatus = useSelector(state => state.auth.status);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleOk = () => {
    setIsAlertVisible(false); 
  };
  useEffect(() => {
    // Khởi tạo SDK Facebook khi component được mount
    Settings.initializeSDK();
  }, []);
  // Hàm xử lý khi người dùng nhấn vào nút "ĐĂNG NHẬP"
  const handleLogin = async () => {
    if (!email || !password) {
      setAlertMessage('Vui lòng nhập đầy đủ thông tin!');
      setAlertTitle('Thiếu thông tin!');
      setIsAlertVisible(true);
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(
        loginUser({email: email.trim(), password}),
      ).unwrap();

      if (response) {
        console.log('User ID exists:', response.userId);
        navigation.navigate('MainApp'); // Bỏ comment dòng này để điều hướng tới màn hình chính
        setEmail(''); // Xóa email đã nhập
        setPassword(''); // Xóa mật khẩu đã nhập
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Thông tin đăng nhập không hợp lệ.';
      // Alert.alert('Đăng nhập thất bại', message);
      setAlertMessage('Đăng nhập thất bại');
      setAlertTitle(message);
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      // Đảm bảo rằng GoogleSignin được cấu hình đúng
      await GoogleSignin.configure({
        webClientId:
          '133917263525-n79u5m6cmkalco31j6ktlrn2n2a27njh.apps.googleusercontent.com', // Thay thế bằng webClientId thực tế của bạn
        offlineAccess: true, // Tùy chọn: Cho phép Firebase truy cập thông tin người dùng ngay cả khi offline
      });
      const {idToken, accessToken} = await GoogleSignin.signIn();

      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        console.log('Đã đăng nhập:', currentUser);
        console.log('userToken', currentUser.idToken);
        await sendTokenToBackend(currentUser.idToken); // Gửi token tới backend để xử lý thêm
        return; // Quay lại ngay vì người dùng đã đăng nhập
      }

      // Tiến hành đăng nhập Google nếu người dùng chưa đăng nhập

      // Tạo thông tin đăng nhập Firebase bằng idToken và accessToken của Google
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      // Đăng nhập với Firebase bằng thông tin đăng nhập Google
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('Thông tin người dùng:', userCredential);

      // Gửi ID token Firebase tới backend sau khi đăng nhập thành công với Firebase
      await sendTokenToBackend(userCredential.idToken);

      // Thông báo cho người dùng đăng nhập thành công
      setAlertMessage('Đăng nhập thành công!');
      setAlertTitle('Chào mừng bạn trở lại!');
      setIsAlertVisible(true);
      // Alert.alert('Đăng nhập thành công', 'Chào mừng bạn trở lại!');
    } catch (error) {
      console.error('Lỗi Đăng nhập Google:', error);
      setAlertMessage('Đăng nhập thất bại!');
      setAlertTitle(error.message || 'Đã có lỗi xảy ra khi đăng nhập');
      setIsAlertVisible(true);
      // Alert.alert(
      //   'Đăng nhập thất bại',
      //   error.message || 'Đã có lỗi xảy ra khi đăng nhập',
      // );
    }
  };
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        setAlertMessage('Đăng nhập bị hủy');
        setAlertTitle('Đăng nhập Facebook bị hủy.');
        setIsAlertVisible(true);
        // Alert.alert('Đăng nhập bị hủy', 'Đăng nhập Facebook bị hủy.');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw new Error('Lỗi khi lấy access token');
      console.log('Access token', data.accessToken);
      // Gửi token Facebook tới backend
      await sendTokenToBackendFacebook(data.accessToken); // <-- Gửi token Facebook ở đây
      setAlertMessage('Đăng nhập thành công!');
      setAlertTitle('Chào mừng bạn trở lại!');
      setIsAlertVisible(true);
      // Alert.alert('Đăng nhập thành công', 'Chào mừng bạn trở lại!');
    } catch (error) {
      console.error('Lỗi Đăng nhập Facebook:', error);
      setAlertMessage('Đăng nhập thất bại');
      setAlertTitle(error.message || 'Đã có lỗi xảy ra khi đăng nhập');
      setIsAlertVisible(true);
      // Alert.alert(
      //   'Đăng nhập thất bại',
      //   error.message || 'Đã có lỗi xảy ra khi đăng nhập',
      // );
    } finally {
      setLoading(false);
    }
  };

  const sendTokenToBackend = async idToken => {
    try {
      console.log('Đây là token:', idToken);

      // Xóa token cũ khỏi AsyncStorage (bước tùy chọn)
      await AsyncStorage.removeItem('userToken');

      // Lưu token mới vào AsyncStorage
      await AsyncStorage.setItem('userToken', idToken);

      // Gửi ID token tới backend qua action loginUserGoogle
      const response = await dispatch(loginUserGoogle(idToken)).unwrap();

      if (response) {
        console.log('User ID exists:', response.userId);

        // Điều hướng đến màn hình MainApp sau khi đăng nhập thành công
        navigation.navigate('MainApp');
      }
    } catch (error) {
      console.error('Lỗi khi gửi token tới backend:', error);

      // Cung cấp thông báo lỗi cho người dùng
      Alert.alert('Lỗi', 'Đã có lỗi khi đăng nhập');
    }
  };
  const sendTokenToBackendFacebook = async accessToken => {
    try {
      console.log('Đây là token:', accessToken);
      // Xóa token cũ khỏi AsyncStorage (bước tùy chọn)
      await AsyncStorage.removeItem('userToken');
      // Lưu token mới vào AsyncStorage
      await AsyncStorage.setItem('userToken', accessToken);
      // Gửi token Facebook tới backend qua action loginUserFacebook
      const response = await dispatch(loginUserFacebook(accessToken)).unwrap();
      if (response) {
        console.log('User ID exists with facebook:', response.userId);
        // Điều hướng đến màn hình MainApp sau khi đăng nhập thành công
        navigation.navigate('MainApp');
      }
    } catch (error) {
      console.error('Lỗi khi gửi token tới backend:', error);
      // Cung cấp thông báo lỗi cho người dùng
      setAlertMessage('Lỗi!');
      setAlertTitle('Đã có lỗi xảy ra khi đăng nhập');
      setIsAlertVisible(true);
      // Alert.alert('Lỗi', 'Đã có lỗi khi đăng nhập');
    }
  };

  return (
    
    <View style={styles.container}>
       <CustomLoading visible={loading} message="Please wait..." />
       <CustomAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        // onCancel={handleCancel}
        onOk={handleOk}
      />
      {/* Back Button (optional) */}

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')} // Make sure to use the correct path for the logo
          style={styles.logo}
        />
      </View>
      <Text style={styles.welcomeText}>Welcome!</Text>
      {/* <Text style={styles.decribeText}>Đăng nhập để tiếp tục sử dụng ứng dụng.</Text> */}

      <View style={styles.inputNameView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputView}
            placeholder="Example: John Smith"
            placeholderTextColor="rgb(177, 189, 199)"
            onChangeText={setEmail}
            value={email}
          />
          <Text style={styles.inputLabel}>Email</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputView}
            placeholder="Example: John Smith"
            placeholderTextColor="rgb(177, 189, 199)"
            secureTextEntry={passwordVisible}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text>{passwordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
          <Text style={styles.inputLabel}>Password</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassNavigation')}>
          <Text style={styles.forgotPassword}>Quên mặt khảu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpNavigation')}>
            <Text style={styles.signupLink}> Đăng ký</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Login Options */}
        <View style={styles.signInContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.signInWithText}>Sign in with</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleFacebookLogin}>
            <Image
              source={require('../../assets/images/icons/fbicon.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>FACEBOOK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}>
            <Image
              source={require('../../assets/images/icons/logogg.jpg')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>GOOGLE</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Section */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  inputLabel1: {
    textTransform: 'uppercase',
    position: 'absolute',
    fontFamily: 'nunitoSan',
    left: 200,
    fontWeight: '700',
    color: '#F55F44',
    top: -11,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
    fontSize: 20,
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    marginBottom: 20,
    marginLeft: 30,
    marginTop: 50,
  },
  logo: {
    width: 350,
    height: 100, // Adjust according to your logo's size
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    padding: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
    top: 5,
  },
  forgotPassword: {
    color: '#ff7f50',
    fontSize: 14,
    marginTop: 25,
    marginRight: 39,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#ff7f50',
    paddingVertical: 15,
    borderRadius: 15,
    width: '70%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signupText: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    fontSize: 14,
    color: '#ff7f50',
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  signInWithText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#333',
  },
  atLeastText: {
    paddingLeft: 10,
    fontSize: 13,
    fontFamily: 'nunitoSan',
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
    fontSize: 12,
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
    height: '55%',
    marginTop: 30,
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
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
    fontFamily: 'nunitoSan',
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
  decribeText: {
    color: '#989DA3',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 28,
    // fontFamily: 'nunitoSan',
    textAlign: 'center',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '15%',
    marginBottom: '2%',
    fontFamily: 'nunitoSan',

    textAlign: 'center',
  },
});

export default LoginScreen;
