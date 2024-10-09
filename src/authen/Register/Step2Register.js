import {
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

const Step2Register = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation(); 

  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };

  const handleNextStep = () => {
    if (!selectedGender) {
      Alert.alert(
        'Gender Not Selected',
        'Please select your gender before proceeding.', 
        [{text: 'OK'}] 
      );
    } else {
      navigation.navigate('Step3');  
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.topView}>
          <TouchableOpacity style={styles.iconTopView} onPress={()=>navigation.goBack()}>
            <Image
              
              style={styles.iconTop}
              source={require('../../../assets/images/backArrow.png')}
            />
          </TouchableOpacity>
          <View style={styles.stepView}>
            <Text style={styles.stepText}>Step 2/4</Text>
          </View>
          <TouchableOpacity style={styles.iconTopView}>
            <Image
              style={styles.iconTop}
              source={require('../../../assets/images/closeArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middleView}>
          <Image
            style={styles.girlThinkingImg}
            source={require('../../../assets/images/girlThinking.png')}
          />
          <View style={styles.contentGender}>
            <Text style={styles.welcomeText}>What is Your Gender?</Text>
            <Text style={styles.decribeText}>
              To make sure you receive the best
            </Text>
            <Text style={styles.decribeText}>
              personalized offers we need to know
            </Text>
            <Text style={styles.decribeText}>your gender.</Text>
          </View>

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
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnContainer}  onPress={handleNextStep}>
            <Text
              style={styles.continueText}
             >
              Next Step
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.skipText}>Skip this</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Step2Register;

const styles = StyleSheet.create({
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
    // backgroundColor:'blue'
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
  decribeText: {
    color: '#989DA3',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '7%',
    marginBottom: '2%',
    fontFamily: 'nunitoSan',
  },
  contentGender: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },
  skipText: {
    fontFamily: 'nunitoSan',
    color: '#F55F44',
    fontSize: 15,
    marginTop: '3.5%',
    fontWeight: '700',
  },
  btnContainer: {
    width: '100%',
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F55F44',
  },
  continueText: {
    fontFamily: 'nunitoSan',
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  btnView: {
    width: '100%',
    height: '20%',
    //   backgroundColor: 'red',
    alignItems: 'center',
  },
  middleView: {
    width: '100%',
    height: '92%',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  girlThinkingImg: {
    width: '50%',
    height: '30%',
    marginTop: '15%',
    resizeMode: 'contain',
  },
  stepText: {
    fontFamily: 'nunitoSan',
    color: '#989DA3',
    fontSize: 15,
    fontWeight: '700',
  },
  stepView: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconTopView: {
    width: '15%',
    height: '100%',
    // backgroundColor: 'pink',
  },
  iconTop: {
    width: '100%',
    height: '100%',

    resizeMode: 'contain',
  },
  topView: {
    width: '100%',
    height: '3%',
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  mainContents: {
    width: '85%',
    height: '85%',
    justifyContent: 'F7F6FB',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#F7F6FB',
    alignItems: 'center',
  },
});
