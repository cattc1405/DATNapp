import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../apiClient';
import { setEmail } from '../../redux/slice/userSlice';
import CustomHeaderSignup from './CustomHeaderSignup';
import CustomAlert from '../../CustomAlert';

const Email = props => {
  const {navigation} = props;
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.name);
  const password = useSelector(state => state.user.password);
  const phone = useSelector(state => state.user.phone);
  const gender = useSelector(state => state.user.gender);
  const email = useSelector(state => state.user.email);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);


  const handleOk = () => {
    setIsAlertVisible(false);
  };
  const admin = false;
  const handleTextChange = text => {
    setInputValue(text);
  };
  const handleRegister = () => {
    // Dispatching actions to store user information
    dispatch(setEmail(inputValue));

    // Prepare the user object for registration
    const userDetails = {
      name: name,
      email: email,
      password: password, // Ensure this is hashed before sending
      phone: phone,
      gender: gender,
      isAdmin: admin,
    };

    register(userDetails)
      .then(() => {
        navigation.navigate('Code1');
      })
      .catch(error => {
        setAlertTitle('Email lỗi!');
      setAlertMessage('Email đã tồn tại!');
      setIsAlertVisible(true);
      });
  };
  return (
    <View style={styles.container}>
       <CustomHeaderSignup
        stepText="Step 5/6"
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
      {/* Tiêu đề bước */}
      
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/emailMan.png')}
          style={styles.illustrationImage}
        />
      </View>
      
      <Text style={styles.title}>What is Your Email?</Text>
      <Text style={styles.description}>
        In order to help us verify you, we need to know your real email.
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputNameView}>
          <TextInput
            style={styles.inputView}
            secureTextEntry={false}
            placeholder="Example: JohnSmith@gmail.com"
            placeholderTextColor="rgb(177, 189, 199)"
            onChangeText={handleTextChange}
            value={inputValue}
          />
          <Text style={styles.inputLabel}>Email</Text>
        </View>
        <Text style={styles.inputHint}>Your name must contain</Text>

        <View style={styles.checkView}>
          <Image
            style={styles.containCheck}
            source={
              inputValue.length >= 5
                ? require('../../../assets/images/orangeChecked.png')
                : require('../../../assets/images/grayNotChecked.png')
            }
          />
          <Text style={styles.atLeastText}>Nhập đúng định dạng</Text>
        </View>
      </View>

      {/* Nút tiếp tục */}
      <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputNameView: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1.8,
    borderColor: 'rgb(211, 222, 232)',
  },
  inputView: {
    paddingHorizontal: 25,
    color: 'black',
    fontWeight: '400',
  },
  atLeastText: {
    paddingLeft: 10,
    fontWeight:'500'
  },
  containCheck: {
    width: 20,
    height: 20,
  },
  checkView: {
    height: 30,
    marginTop: '1.2%',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  twopeopleShadow: {
    width: '70%',
    marginTop: 10,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F6FB',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  stepText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationImage: {
    width: 350,
    height: 270,
    resizeMode: 'contain',
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
    width: '90%',
    elevation:5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderColor: 'gray',
    marginBottom: 30,
    alignItems: 'flex-start',
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  inputHint: {
    fontSize: 15,
    color: '#888',
    marginTop: 10,
    fontWeight: '500',
  },
  inputRequirement: {
    fontSize: 12,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'nunitoSan',
  },
});

export default Email;
