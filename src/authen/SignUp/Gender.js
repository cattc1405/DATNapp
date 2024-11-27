import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { setGender } from '../../redux/slice/userSlice';
import CustomAlert from '../../CustomAlert';

const Gender = props => {
  const {navigation} = props;
  const route = useRoute();
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.name);
  const gender = useSelector(state => state.user.gender);
  const [selectedGender, setSelectedGender] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const handleOk = () => {
    setIsAlertVisible(false); 
  };

  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };
  console.log(name);
  const handleNextStep = () => {
    if (selectedGender=='') {
      setAlertMessage('Select your gender!');
      setAlertTitle('Gender unselected!');
      setIsAlertVisible(true);
    } else {
      dispatch(setGender(selectedGender));

      navigation.navigate('ReceiveNotifi');
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/Back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 2/10</Text>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => navigation.navigate('Login')}>
          <Image
            source={require('../../../assets/images/Exit.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Image ở giữa */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/Img3.png')}
          style={styles.image}
        />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>What is Your Gender?</Text>

      {/* Mô tả */}
      <Text style={styles.description}>
        To make sure you receive the best personalized offers we need to know
        your gender.
      </Text>

      <View style={styles.chooseGenderView}>
        {/* gender female */}
        <TouchableOpacity
          style={styles.genderView}
          onPress={() => handleSelectGender('female')}>
          <View style={styles.checkGenderView}>
            <Image
              style={styles.checkedBlank}
              source={
                selectedGender === 'female'
                  ? require('../../../assets/images/orangeChecked.png')
                  : require('../../../assets/images/grayNotChecked.png')
              }
            />
          </View>
          <View style={styles.genderImgIcon}>
            <Image
              style={styles.iconTop}
              source={require('../../../assets/images/femalePicIcon.png')}
            />
          </View>
          <Text
            style={
              selectedGender === 'female'
                ? styles.checkedgenderText
                : styles.genderText
            }>
            Female
          </Text>
        </TouchableOpacity>

        {/* male */}
        <TouchableOpacity
          style={styles.genderView}
          onPress={() => handleSelectGender('male')}>
          <View style={styles.checkGenderView}>
            <Image
              style={styles.checkedBlank}
              source={
                selectedGender === 'male'
                  ? require('../../../assets/images/orangeChecked.png')
                  : require('../../../assets/images/grayNotChecked.png')
              }
            />
          </View>
          <View style={styles.genderImgIcon}>
            <Image
              style={styles.iconTop}
              source={require('../../../assets/images/malePicIcon.png')}
            />
          </View>
          <Text
            style={
              selectedGender === 'male'
                ? styles.checkedgenderText
                : styles.genderText
            }>
            Male
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nút bấm */}
      <TouchableOpacity
        style={styles.nextButton}
        // disabled={!selectedGender}
        onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>

      {/* Skip link */}
      <TouchableOpacity>
        <Text style={styles.skipText}>Skip this Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconTop: {
    width: '100%',
    height: '100%',

    resizeMode: 'contain',
  },
  checkedgenderText: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },
  genderText: {
    color: '#CBCED1',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },
  genderImgIcon: {
    width: '100%',
    height: '50%',
  },
  checkGenderView: {
    width: '100%',
    marginTop: '5%',
    height: '20%',
    justifyContent: 'center',
  },
  checkedBlank: {
    width: '20%',
    marginLeft: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  genderView: {
    width: '45%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  chooseGenderView: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'nunitoSan',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    fontWeight:'500',
    marginBottom: 20,
    // fontFamily: 'nunitoSan',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  // genderOption: {
  //   alignItems: 'center',
  //   backgroundColor: '#FFF',
  //   paddingVertical: 20,
  //   paddingHorizontal: 15,
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   borderColor: 'transparent',
  //   width: 140,
  //   elevation: 3, // tạo hiệu ứng bóng cho lựa chọn
  // },
  selectedGenderOption: {
    borderColor: '#FF6347',
  },
  // genderIcon: {
  //   width: 60,
  //   height: 60,
  //   marginBottom: 10,
  // },
  // genderText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  nextButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  skipText: {
    textAlign: 'center',
    color:'red',
    fontSize:15,
    fontWeight:'500',
    marginBottom: 20,
  },
});

export default Gender;
