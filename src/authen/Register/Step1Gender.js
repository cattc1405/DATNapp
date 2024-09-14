import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const Step1Gender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle001}>
        <Image source={require('../../../assets/images/circle001.png')} />
        <Image
          style={styles.lqrHong}
          source={require('../../../assets/images/langquanghong.png')}
        />
      </View>
      <View style={styles.mainContents}>
        <View style={styles.topView}>
          <TouchableOpacity style={styles.iconTopView}>
            <Image
              style={styles.iconTop}
              source={require('../../../assets/images/backArrow.png')}
            />
          </TouchableOpacity>
          <View style={styles.stepView}>
            <Text style={styles.stepText}>Step 1/4</Text>
          </View>
          <TouchableOpacity style={styles.iconTopView}>
            <Image
              style={styles.iconTop}
              source={require('../../../assets/images/closeArrow.png')}
            />
          </TouchableOpacity>
        </View>

        {/* middleView */}
        <View style={styles.middleView}>
          <Image
            style={styles.twopeopleImg}
            source={require('../../../assets/images/nameImgPic.png')}
          />
           <Image
            style={styles.twopeopleShadow}
            source={require('../../../assets/images/twopeopleShadow.png')}
          />
          <View style={styles.contentGender}>
            <Text style={styles.nameText}>What is Your Name?</Text>
            <Text style={styles.decribeText}>
              In order to help us identify you, we need
            </Text>
            <Text style={styles.decribeText}>
            to know your real name 
            </Text>
          </View>

          <View style={styles.inputNameView}>
            
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text
              style={styles.continueText}
              onPress={() => navigation.navigate('Welcome2')}>
              Next Step
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.skipText}>Skip this</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Step1Gender;

const styles = StyleSheet.create({
  lqrHong: {
    position: 'absolute',
    bottom: 0,
    left: 30,
  },
  circle001: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  checkedgenderText: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
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
  inputNameView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    height: '26%',
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
  nameText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '10%',
    marginBottom: '2%',
    fontFamily: 'nunitoSan',
  },
  contentGender: {
    width: '100%',
    height: '22%',
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
    height: '87%',
    alignItems: 'center',
  },
  twopeopleShadow: {
    width: '70%',
  },
  twopeopleImg: {
    width: '80%',
    height: '40%',
    marginTop: '10%',
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
