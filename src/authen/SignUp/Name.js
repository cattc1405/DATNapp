import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const Name = props => {
  const { navigation } = props;
  const [inputValue, setInputValue] = useState('');
  const handleTextChange = text => {
    setInputValue(text);
  };
  return (
    <View style={styles.container}>
      {/* Tiêu đề bước */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/Back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 1/10</Text>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/Exit.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/ImgPeople.png')}
          style={styles.illustrationImage}
        />
      </View>
      <Image
        style={styles.twopeopleShadow}
        source={require('../../../assets/images/twopeopleShadow.png')}
      />
      <Text style={styles.title}>What is Your Name?</Text>
      <Text style={styles.description}>
        In order to help us identify you, we need to know your real name.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>FULL NAME</Text>
        <TextInput
          style={styles.inputView}
          placeholder="Example: John Smith"
          placeholderTextColor="rgb(177, 189, 199)"
          onChangeText={handleTextChange} // Cập nhật trạng thái text
          value={inputValue}
        />
        <Text style={styles.inputHint}>Your name must contain</Text>

        <View style={styles.checkView}>
          <Image
            style={styles.containCheck}
            source={
              inputValue.length >= 5
                ? require('../../../assets/images/orangeChecked.png')
                : require('../../../assets/images/grayNotChecked.png')
            }
          />
          <Text style={styles.atLeastText}>At least 5 characters</Text>
        </View>
      </View>

      {/* Nút tiếp tục */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Gender')}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  atLeastText: {
    paddingLeft: 10,
    fontFamily: 'nunitoSan'
  },
  containCheck: {
    width: 20,
    height: 20,
  },
  checkView: {
    height: 30,
    marginTop: '1.2%',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  twopeopleShadow: {
    width: '70%',
    marginTop: 10,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F6FB',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  stepText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    fontFamily: 'nunitoSan'
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationImage: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'nunitoSan'
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    fontFamily: 'nunitoSan'
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    alignItems: 'flex-start', // Đặt nội dung bên trái
  },
  inputLabel: {
    fontSize: 12,
    color: '#FF6F61',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'nunitoSan'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  inputHint: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'nunitoSan'
  },
  inputRequirement: {
    fontSize: 12,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'nunitoSan'
  },
});

export default Name;
