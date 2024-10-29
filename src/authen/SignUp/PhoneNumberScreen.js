import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const PhoneNumberScreen = (props) => {
  const { navigation } = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US'); // Default country code
  const [callingCode, setCallingCode] = useState('1');  // Default calling code

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleNextStep = () => {
    if (phoneNumber.length === 11) {
      console.log('Next step');
      navigation.navigate('NextScreen');
    } else {
      console.log('Please enter a valid phone number');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/Back.png')} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 4/10</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Image source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../../assets/images/PhoneImage.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Add Your Phone Number</Text>
      <Text style={styles.description}>
        Enter your phone number in order to {"\n"} send you your OTP security code.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PHONE NUMBER</Text>

        {/* Combined CountryPicker and TextInput */}
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryPickerContainer}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
              containerButtonStyle={styles.countryPicker}
            />
            <Text style={styles.callingCodeText}>+{callingCode}</Text>
          </View>
            <View style={styles.gach}></View>
          <TextInput
            style={styles.phoneInput}
            placeholder="1-541-754-3010"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>

        <Text style={styles.validationText}>YOUR PHONE NUMBER MUST CONTAIN</Text>
        <Text style={styles.listText}>• An area code</Text>
        <Text style={styles.listText}>• Exactly 11 numbers</Text>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, phoneNumber.length !== 11 && styles.nextButtonDisabled]}
        onPress={handleNextStep}
        disabled={phoneNumber.length !== 11}
      >
        <Text style={styles.buttonText}>Next Step</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        I Accept the{' '}
        <Text style={styles.linkText} onPress={() => console.log('Terms and Conditions clicked')}>
          Terms and Conditions
        </Text>
      </Text>
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
    width: 198,
    height: 209,
    alignSelf: 'center',
    marginLeft: 60,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
    marginVertical: 20,
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
    backgroundColor: '#FFFFFF',
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
    fontSize: 10.5,
    fontWeight: '800',
    color: '#F55F44',
  },
  gach:{
      width: 1, // Width of the divider
      height: 50, // Adjust the height to your preference
      backgroundColor: '#C0C0C0', // Divider color
      marginHorizontal: 2, // Space around the divider
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor:'#C0C0C0',
    paddingHorizontal: 10
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5, // Space between country picker and phone input
  },
  callingCodeText: {
    fontSize: 16,
    color: '#F55F44',
    marginLeft: 5, // Adjust margin
  },
  countryPicker: {
    marginRight: -5, // Adjusted margin
  },
  phoneInput: {
    flex: 1, // Takes up remaining space

    fontSize: 16,
    marginBottom: 0,
  },
  validationText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#979DA3',
    marginBottom: 5,
    marginLeft: 30,
  },
  listText: {
    fontSize: 11,
    color: '#989DA3',
    marginLeft: 30,
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  nextButtonDisabled: {
    backgroundColor: '#F55F44',
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  termsText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#989DA3',
    fontSize: 14,
    fontWeight: '700',
  },
  linkText: {
    color: '#F55F44',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default PhoneNumberScreen;
