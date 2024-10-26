import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'

const NewPass = (props) => {
  const { navigation } = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('Code')} >
          <Image
            source={require('../../../assets/images/Back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 3/3</Text>
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
      <Text style={styles.title}>Set Your New Password</Text>
      <Text style={styles.description}>
        Try to create a new password that you{"\n"} will remember.
      </Text>

      {/* Box containing the password inputs and requirements */}
      <View style={styles.boxContainer}>
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

        <View style={styles.passwordRequirements}>
          <Text style={styles.requirementTitle}> YOUR PASSWORD MUST CONTAIN</Text>
          <Text style={styles.requirement}>🟠 Between 8 and 20 characters</Text>
          <Text style={styles.requirement}>🟠 1 upper case letter</Text>
          <Text style={styles.requirement}>🟠 1 or more numbers</Text>
          <Text style={styles.requirement}>🟠 1 or more special characters</Text>
        </View>
      </View>

      {/* Nút "Next Step" */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordRequirements: {
    marginHorizontal: 50,
  },
  inputContainer: {
    borderRadius: 20
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F6FB',
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
    color: '#989DA3'
  },
  closeButton: {
    padding: 20,
  },
  image: {
    width: 142,
    height: 127,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#989DA3',
    marginBottom: 20,
    lineHeight: 25
  },
  boxContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    borderRadius: 30
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingVertical: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
  iconButton: {
    padding: 10,
  },
  requirementTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  requirement: {
    fontSize: 11,
    marginBottom: 5,
    color: '#555',

  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 30,
    paddingVertical: 10

  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPass;
