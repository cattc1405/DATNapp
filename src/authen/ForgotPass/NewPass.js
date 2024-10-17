import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'

const NewPass = (props) => {
  const { navigation } = props
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

      {/* Tiêu đề */}
      <Text style={styles.title}>Set Your New Password</Text>

      {/* Mô tả */}
      <Text style={styles.description}>
        Try to create a new password that you will remember.
      </Text>

      {/* Ô nhập mật khẩu */}
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

      {/* Ô nhập xác nhận mật khẩu */}
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
        <Text style={styles.requirementTitle}>YOUR PASSWORD MUST CONTAIN</Text>
        <Text style={styles.requirement}>• Between 8 and 20 characters</Text>
        <Text style={styles.requirement}>• 1 upper case letter</Text>
        <Text style={styles.requirement}>• 1 or more numbers</Text>
        <Text style={styles.requirement}>• 1 or more special characters</Text>
      </View>

      {/* Nút "Next Step" */}
      <TouchableOpacity style={styles.nextButton}>
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
  backText: {
    fontSize: 24,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 24,
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
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
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
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPass