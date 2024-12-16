import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import CheckBox from '@react-native-community/checkbox'; 

const PhoneNumberScreen = (props) => {
  const { navigation } = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleNextStep = () => {
    if (phoneNumber.length === 11 && isAccepted) {
      console.log('Next step');
      // Navigate to the next screen
      navigation.navigate('NextScreen');
    } else {
      console.log('Vui lòng nhập số điện thoại hợp lệ và chấp nhận các điều khoản');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/Back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 4/10</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Image
            source={require('../../../assets/images/Exit.png')}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../../assets/images/PhoneImage.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Add Your Phone Number</Text>
      <Text style={styles.description}>
      Nhập số điện thoại của bạn để chúng tôi gửi cho bạn mã bảo mật OTP.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PHONE NUMBER</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="1-541-754-3010"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
        <Text style={styles.validationText}>Your phone number must contain:</Text>
        <Text style={styles.listText}>• An area code</Text>
        <Text style={styles.listText}>• Exactly 11 numbers</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isAccepted}
          onValueChange={setIsAccepted}
          tintColors={{ true: '#F55F44', false: '#989DA3' }}
        />
        <Text style={styles.checkboxText}>I Accept the</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, (!isAccepted || phoneNumber.length !== 11) && styles.nextButtonDisabled]}
        onPress={handleNextStep}
        disabled={!isAccepted || phoneNumber.length !== 11}
      >
        <Text style={styles.buttonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '800',
    color: '#989DA3',
  },
  closeButton: {
    padding: 10,
  },
  image: {
    width: 142,
    height: 127,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginVertical: 10,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#989DA3',
    marginBottom: 20,
    lineHeight: 25,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#F55F44',
  },
  phoneInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#F55F44',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  validationText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#979DA3',
    marginBottom: 5,
  },
  listText: {
    fontSize: 11,
    color: '#989DA3',
    fontWeight: '600',
    marginLeft: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 50,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#989DA3',
  },
  linkText: {
    color: '#F55F44',
    marginLeft: 4,
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  nextButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});

export default PhoneNumberScreen;
