import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Step3Register = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const handleTextChange = text => {
    setInputValue(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.topView}>
          <TouchableOpacity
            style={styles.iconTopView}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.iconTop}
              source={require('../../../assets/images/backArrow.png')}
            />
          </TouchableOpacity>
          <View style={styles.stepView}>
            <Text style={styles.stepText}>Step 3/4</Text>
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
            style={styles.setPassImg}
            source={require('../../../assets/images/setPasswordImg.png')}
          />

          <View style={styles.contentPass}>
            <Text style={styles.passText}>Set Your Password</Text>
            <Text style={styles.decribeText}>
              In order to keep your account safe you need
            </Text>
            <Text style={styles.decribeText}>to create a strong password.</Text>
          </View>

          <View style={styles.inputNameView}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputView}
                secureTextEntry={true}
                placeholder="Example: John Smith"
                placeholderTextColor="rgb(177, 189, 199)"
                onChangeText={handleTextChange}
                value={inputValue}
              />
              <Text style={styles.inputLabel}>Password</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputView}
                placeholder="Example: John Smith"
                placeholderTextColor="rgb(177, 189, 199)"
                secureTextEntry={true}
              />
              <Text style={styles.inputLabel}>confirm password</Text>
            </View>

            <Text style={styles.containText}>Your password must contain</Text>
            <View style={styles.checkView}>
              <Image
                style={styles.containCheck}
                source={
                  inputValue.length >= 8 && inputValue.length <= 20
                    ? require('../../../assets/images/orangeChecked.png')
                    : require('../../../assets/images/grayNotChecked.png')
                }
              />
              <Text style={styles.atLeastText}>
                Between 8 and 20 characters
              </Text>
            </View>
            <View style={styles.checkView}>
              <Image
                style={styles.containCheck}
                source={
                  /[A-Z]/.test(inputValue)
                    ? require('../../../assets/images/orangeChecked.png')
                    : require('../../../assets/images/grayNotChecked.png')
                }
              />
              <Text style={styles.atLeastText}>1 upper case letter</Text>
            </View>
            <View style={styles.checkView}>
              <Image
                style={styles.containCheck}
                source={
                  /[0-9]/.test(inputValue)
                    ? require('../../../assets/images/orangeChecked.png')
                    : require('../../../assets/images/grayNotChecked.png')
                }
              />
              <Text style={styles.atLeastText}>1 or more numbers</Text>
            </View>
            <View style={styles.checkView}>
              <Image
                style={styles.containCheck}
                source={
                  /[!@#$%^&*(),.?":{}|<>]/.test(inputValue)
                    ? require('../../../assets/images/orangeChecked.png')
                    : require('../../../assets/images/grayNotChecked.png')
                }
              />
              <Text style={styles.atLeastText}>
                1 or more special characters
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.continueText}>Next Step</Text>
          </TouchableOpacity>
          {/* <Text style={styles.skipText}>Skip this</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Step3Register;

const styles = StyleSheet.create({
  atLeastText: {
    paddingLeft: 10,
    fontSize: 13,
    fontFamily: 'nunitoSan',
  },
  containCheck: {
    width: 17,
    height: 17,
  },
  checkView: {
    width: '70%',
    height: 25,
    marginLeft: '20%',
    marginTop: '1.2%',
    marginBottom: '-1%',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  containText: {
    marginLeft: '20%',
    fontWeight: '700',
    fontFamily: 'nunitoSan',
    textTransform: 'uppercase',
    fontSize: 12,
    marginTop: '8%',
    color: '#989DA3',
  },
  inputView: {
    paddingHorizontal: 25,
    color: 'black',
    fontWeight: '400',
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
  inputContainer: {
    marginTop: '10%',
    width: '80%',
    marginLeft: '10%',
    marginBottom: '-4%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1.8,
    borderColor: 'rgb(211, 222, 232)',
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
    height: '45%',
    // backgroundColor:'yellow'
  },
  decribeText: {
    color: '#989DA3',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },
  passText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '7%',
    marginBottom: '2%',
    fontFamily: 'nunitoSan',
  },
  contentPass: {
    width: '100%',
    height: '20%',
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
    height: '15%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  middleView: {
    width: '100%',
    height: '92%',
    alignItems: 'center',
  },

  setPassImg: {
    width: '40%',
    height: '25%',
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
