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
import {setName} from '../../redux/slice/userSlice';
import CustomAlert from '../../CustomAlert';
import CustomHeaderSignup from './CustomHeaderSignup';

const Name = props => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {navigation} = props;
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const handleOk = () => {
    setIsAlertVisible(false);
  };

  const handleTextChange = text => {
    
    setInputValue(text);
  };

  const handleNextStep = text => {
    if (!inputValue) {
      setAlertMessage('Vui lòng nhập tên của bạn!');
      setAlertTitle('Thiếu thông tin!');
      setIsAlertVisible(true);
    }
    else if(inputValue.length < 5){ setAlertMessage('Vui lòng nhập tên dài hơn 5 ký tự!');
    setAlertTitle('Tên quá ngắn!');
    setIsAlertVisible(true);}else
    {
      navigation.navigate('Gender')

    }
  };
  return (
    <View style={styles.container}>
      <CustomAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        // onCancel={handleCancel}
        onOk={handleOk}
      />
      <Image
        style={styles.langquang}
        source={require('../../../assets/images/topLeftFl.png')}
      />
      
      <CustomHeaderSignup
        stepText="Step 1/6"
        onBackPress={() => navigation.goBack()}
        onClosePress={() => navigation.navigate('Login')}
      />
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
      <Text style={styles.title}>Tên bạn là gì?</Text>
      <Text style={styles.description}>
      Để giúp chúng tôi xác định danh tính của bạn, chúng tôi cần biết tên thật của bạn.      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputNameView}>
          <TextInput
            style={styles.inputView}
            secureTextEntry={false}
            placeholder="Example: John Smith"
            placeholderTextColor="rgb(177, 189, 199)"
            onChangeText={handleTextChange}
            value={inputValue}
          />
          <Text style={styles.inputLabel}>Name</Text>
        </View>
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
        onPress={() => {
          dispatch(setName(inputValue));
          handleNextStep()
        }}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  langquang: {
    position: 'absolute',
    left: 0,
    top:0
  },
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
    // fontFamily: 'nunitoSan',
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
    marginTop: 0,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F6FB',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    width: 280,
    height: 250,
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
    color: 'gray',
    textAlign: 'center',
    fontWeight: '400',
    marginHorizontal: 20,
    marginBottom: 20,
    // fontFamily: 'nunitoSan',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation:5,
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
    fontSize: 15,
    color: '#888',
    marginTop: 10,
    fontWeight: '500',
    // fontFamily: 'nunitoSan',
  },
  inputRequirement: {
    fontSize: 12,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  nextButton: {
    // position: 'absolute',
    // width: '100%',
    // marginLeft: '7%',
    // bottom: 50,
    marginTop: 50,
    
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'nunitoSan',
  },
});

export default Name;
