import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Step1Register = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const handleTextChange = text => {
    setInputValue(text);
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
          <View style={styles.contentName}>
            <Text style={styles.nameText}>Tên của bạn là gì?</Text>
            <Text style={styles.decribeText}>
              Để giúp chúng tôi nhận diện bạn, chúng tôi cần
            </Text>
            <Text style={styles.decribeText}>biết tên thật của bạn</Text>
          </View>

          <View style={styles.inputNameView}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputView}
                placeholder="Ví dụ: Nguyễn Văn A"
                placeholderTextColor="rgb(177, 189, 199)"
                onChangeText={handleTextChange} // Cập nhật trạng thái text
                value={inputValue}
              />
              <Text style={styles.inputLabel}>HỌ VÀ TÊN</Text>
            </View>

            <Text style={styles.containText}>Tên của bạn cần có:  </Text>
            <View style={styles.checkView}>
              <Image
                style={styles.containCheck}
                source={
                  inputValue.length >= 5
                    ? require('../../../assets/images/orangeChecked.png')
                    : require('../../../assets/images/grayNotChecked.png')
                }
              />
              <Text style={styles.atLeastText}>Ít nhất 5 ký tự</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate("Step2")}>
            <Text style={styles.continueText} >Next Step</Text>
          </TouchableOpacity>
          {/* <Text style={styles.skipText}>Skip this</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Step1Register;

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
    width: '70%',
    height: 30,
    marginLeft: '20%',
    marginTop: '1.2%',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  containText: {
    marginLeft: '20%',
    fontWeight: '700',
    fontFamily: 'nunitoSan',
    textTransform: 'uppercase',
    fontSize: 13,
    marginTop: '4%',
    color: '#989DA3',
  },
  inputView: {
    paddingHorizontal: 25,
    color: 'black',
    fontWeight: '400',
  },
  inputLabel: {
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
    height: 50,
    borderRadius: 25,
    borderWidth: 1.8,
    borderColor: 'rgb(211, 222, 232)',
  },
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
    // flexDirection: 'column',
    // justifyContent: 'space-between',/
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
  contentName: {
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
    height: '92%',
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
