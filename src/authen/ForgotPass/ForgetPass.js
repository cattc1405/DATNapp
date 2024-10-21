import {View, Text, StyleSheet, TouchableOpacity, Alert,Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const ForgetPass = ({navigation}) => {
  // const {navigation} = props;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleSendcode = () => {
    if (!selectedOption) {
      Alert.alert(
        'Method Not Selected',
        'Please select your contact method before proceeding.',
        [{text: 'OK'}],
      );
    } else {
      navigation.navigate('Code');
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
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.description}>
        Choose from the two contact methods in order to send you an OTP code to
        restore your password.
      </Text>

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
          1 VIA MOBILE NUMBER
        </Text>
        <Text style={styles.subText}>
          We will send you your OTP number via SMS.
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
          2 VIA EMAIL
        </Text>
        <Text style={styles.subText}>
          We will send you your OTP number via EMAIL.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendcode}>
        <Text style={styles.sendButtonText}>Send Verification Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionTextNonchecked: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
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
  backText: {
    fontSize: 24,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
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
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
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
  },
  subText: {
    fontSize: 14,
    color: '#777',
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
  },
});

export default ForgetPass;
