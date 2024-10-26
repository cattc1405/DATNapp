import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const YourPass = () => {

  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const handleTextChange = text => {
    setInputValue(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={()=>navigation.goBack()}>
          <Image source={require('../../../assets/images/Back.png')} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 6/10</Text>
        <TouchableOpacity style={styles.closeButton} onPress={()=>navigation.navigate('Login')}>
          <Image source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>

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

      {/* Ô nhập mật khẩu */}
      {/* <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PASSWORD</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
            style={styles.iconButton}
          >
            <Image
              source={require('../../../assets/images/NotEye.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPassword('')}
            style={styles.iconButton}
          >
            <Image
              source={require('../../../assets/images/RedExit.png')} />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Ô nhập xác nhận mật khẩu */}
      {/* <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="********"
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
            style={styles.iconButton}
          >
            <Image
              source={require('../../../assets/images/NotEye.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setConfirmPassword('')}
            style={styles.iconButton}
          >
            <Image
              source={require('../../../assets/images/RedExit.png')} />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.passwordRequirements}>
        <Text style={styles.requirementTitle}>YOUR PASSWORD MUST CONTAIN</Text>
        <Text style={styles.requirement}>• Between 8 and 20 characters</Text>
        <Text style={styles.requirement}>• 1 upper case letter</Text>
        <Text style={styles.requirement}>• 1 or more numbers</Text>
        <Text style={styles.requirement}>• 1 or more special characters</Text>
      </View> */}

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
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Finger')}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom:10,
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
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'nunitoSan'
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    fontFamily: 'nunitoSan'
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
    fontFamily: 'nunitoSan'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
    fontFamily: 'nunitoSan'
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
    shadowOffset: { width: 0, height: 2 },
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
    fontFamily: 'nunitoSan'
  },
});

export default YourPass;