import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ForgetPass = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/Back.png')} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 1/3</Text>
        </View>
      </View>
      <View style={styles.imagePlaceholder}>
        <Image source={require('../../../assets/images/Img.png')} />
      </View>
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.description}>
        Choose from the two contact methods{"\n"} in order to send you an OTP code to{"\n"} restore your password.
      </Text>

      <TouchableOpacity style={styles.option}>
        <Image source={require('../../../assets/images/one.png')} style={styles.icon} />
        <View style={styles.optionContent}>
          <Text style={styles.optionText}>VIA MOBILE NUMBER</Text>
          <Text style={styles.subText}>We will send you your OTP number via{"\n"} SMS.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Image source={require('../../../assets/images/two.png')} style={styles.icon} />
        <View style={styles.optionContent}>
          <Text style={styles.optionText}>VIA EMAIL</Text>
          <Text style={styles.subText}>We will send you your OTP number via{"\n"} EMAIL.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('Code')}>
        <Text style={styles.sendButtonText}>Send Verification Code</Text>
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
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,

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
  stepText: {
    fontSize: 16,
    color: '#989DA3',
    marginLeft: 135,
    fontWeight: '800'
  },
  imagePlaceholder: {
    width: 215,
    height: 159,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000'
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    color: '#989DA3',
    marginBottom: 20,
    lineHeight: 25,
  },
  option: {
    flexDirection: 'row', // Sắp xếp các thành phần theo chiều ngang
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 15, // Thêm khoảng cách giữa ảnh và văn bản
    marginBottom: 40
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 11,
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
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgetPass;
