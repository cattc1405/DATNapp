import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Code = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ForgetPass')}>
            <Image source={require('../../../assets/images/Back.png')} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 2/3</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Image source={require('../../../assets/images/Exit.png')} />
        </TouchableOpacity>
      </View>

      <Image source={require('../../../assets/images/Mobile.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Enter the Verification Code</Text>
      <Text style={styles.description}>
        Enter the 4 digit number that we sent{"\n"} to mafalda123@gmail.com.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.input} maxLength={1} keyboardType="numeric" />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('NewPass')}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn't Receive Anything? <Text style={styles.resendLink}>Resend Code</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#989DA3',
    marginLeft: 10,
  },
  closeButton: {
    padding: 10,
  },
  image: {
    width: 256,
    height: 214,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#989DA3',
    fontWeight: '300',
    marginBottom: 20,
    lineHeight: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: '10%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#E1E0E0',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#F55F44',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    marginHorizontal: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  resendText: {
    textAlign: 'center',
    color: '#989DA3',
    fontSize: 14,
  },
  resendLink: {
    color: '#F55F44',
    fontWeight: 'bold',
  },
});

export default Code;
