import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet } from 'react-native';

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleNextStep = () => {
    if (phoneNumber.length === 11 && isAccepted) {
      // Proceed to the next step
      console.log('Next step');
    } else {
      console.log('Please enter valid phone number and accept terms');
    }
  };

  return (
    <View style={styles.container}>
      {/* Step 4/10 Header */}
      <Text style={styles.stepText}>Step 4/10</Text>

      {/* Add Phone Number Section */}
      <Text style={styles.headerText}>Add Your Phone Number</Text>
      <Text style={styles.descriptionText}>
        Enter your phone number in order to send you your OTP security code.
      </Text>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
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

      {/* Accept Terms */}
      <View style={styles.checkboxContainer}>
        <CheckBox value={isAccepted} onValueChange={setIsAccepted} />
        <Text style={styles.checkboxText}>I Accept the</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      {/* Next Step Button */}
      <TouchableOpacity
        style={styles.nextButton}
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
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  stepText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  inputContainer: {
    marginBottom: 20,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  validationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  listText: {
    fontSize: 14,
    color: 'gray',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
  },
  linkText: {
    color: 'blue',
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PhoneNumberScreen;
