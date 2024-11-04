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
import {AuthContext} from '../../context/AuthContext';
import {loginUser} from '../redux/slice/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Bin123456');
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status); // Accessing auth status from the Redux store
  const error = useSelector(state => state.auth.error);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const authStatus = useSelector(state => state.auth.status);

  // Hàm xử lý khi người dùng nhấn vào nút "LOGIN"
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await dispatch(
        loginUser({email: email.trim(), password}),
      ).unwrap();

      if (response) {
        console.log('User ID exists:', response.userId);
        navigation.navigate('MainApp'); // Uncomment this line to enable navigation
        setEmail(''); // Clear email input
        setPassword(''); // Clear password input
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Invalid credentials.';
      Alert.alert('Login Failed', message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button (optional) */}
      <TouchableOpacity style={styles.backButton}>
        <Image source={require('../../assets/images/backArrow.png')} />
      </TouchableOpacity>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')} // Make sure to use the correct path for the logo
          style={styles.logo}
        />
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Login</Text>

        {/* E-mail Input */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email or phone"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail} // Cập nhật email khi người dùng nhập
        />

        {/* Password Input with Visibility Toggle */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword} // Cập nhật password khi người dùng nhập
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text>{passwordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassNavi')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Sign Up Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpNavi')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Login Options */}
        <View style={styles.signInContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.signInWithText}>Sign in with</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../assets/images/icons/logogg.jpg')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>FACEBOOK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../assets/images/icons/logogg.jpg')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>GOOGLE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
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
    marginLeft: 20,
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
    marginBottom: 15,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#ff7f50',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
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
});

export default LoginScreen;
