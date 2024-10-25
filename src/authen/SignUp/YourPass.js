import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'

const YourPass = (props) => {
  const { navigation } = props
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('Code1')} >
          <Image
            source={require('../../../assets/images/Back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 6/10</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Image
            source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../../assets/images/Img2.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Set Your Password</Text>
      <Text style={styles.description}>
        In order to keep your account safe you need{"\n"} to create a strong password.
      </Text>

      {/* Unified box containing password fields and requirements */}
      <View style={styles.passwordBox}>
        {/* Password Input */}
        <View style={styles.inputContainer}>
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
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
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

        {/* Password Requirements */}
        <View style={styles.requirementsBox}>
          <Text style={styles.requirementTitle}>YOUR PASSWORD MUST CONTAIN</Text>
          {['Between 8 and 20 characters', '1 upper case letter', '1 or more numbers', '1 or more special characters'].map((requirement, index) => (
            <View style={styles.requirementRow} key={index}>
              <View style={styles.checkBox} />
              <Text style={styles.requirement}>{requirement}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton}
        onPress={() => navigation.navigate('Finger')}>
        <Text style={styles.nextButtonText}>Next Step</Text>
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
  },
  closeButton: {
    padding: 10,
  },
  image: {
    width: 140,
    height: 130,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000'
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#989DA3',
    marginBottom: 20,
    lineHeight: 25,
    fontWeight: '600',

  },
  passwordBox: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#F55F44',
  },
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
  requirementsBox: {
  },
  requirementTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#979DA3',
    textAlign: 'center',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkBox: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6347',
    marginRight: 10,
  },
  requirement: {
    fontSize: 11,
    color: '#989DA3',

  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    marginHorizontal: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',



  },
});

export default YourPass;
