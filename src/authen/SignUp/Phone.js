import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setPhone} from '../../redux/slice/userSlice';
const Phone = props => {
  const {navigation} = props;
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

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
        <Text style={styles.stepText}>Step 8/10</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
      <Text style={styles.title}>What is Your Phone?</Text>
      <Text style={styles.description}>
        In order to help us verify you, we need to know your real email.
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputNameView}>
          <TextInput
            style={styles.inputView}
            secureTextEntry={false}
            placeholder="+91 4587341"
            placeholderTextColor="rgb(177, 189, 199)"
            onChangeText={handleTextChange}
            value={inputValue}
            keyboardType="phone-pad"
          />
          <Text style={styles.inputLabel}>Phone</Text>
        </View>
        <Text style={styles.inputHint}>Your Phone must contain</Text>

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
        onPress={() => {
          dispatch(setPhone(inputValue));
          navigation.navigate('Email');
        }}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputNameView: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1.8,
    borderColor: 'rgb(211, 222, 232)',
  },
  inputView: {
    paddingHorizontal: 25,
    color: 'black',
    fontWeight: '400',
  },
  atLeastText: {
    paddingLeft: 10,
    fontFamily: 'nunitoSan',
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
    fontFamily: 'nunitoSan',
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
    fontFamily: 'nunitoSan',
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    fontFamily: 'nunitoSan',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderColor: 'gray',
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  inputLabel: {
    textTransform: 'uppercase',
    position: 'absolute',
    fontFamily: 'nunitoSan',
    left: 20,
    fontWeight: '700',
    color: '#F55F44',
    top: -11,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
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
    fontFamily: 'nunitoSan',
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
    fontFamily: 'nunitoSan',
  },
});

export default Phone;
