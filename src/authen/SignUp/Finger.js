import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const Finger = props => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      {/* Tiêu đề bước */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/Back.png')}
            style={styles.icon} // Cập nhật kích thước biểu tượng
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 5/10</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            source={require('../../../assets/images/Exit.png')}
            style={styles.icon} // Cập nhật kích thước biểu tượng
          />
        </TouchableOpacity>
      </View>

      {/* Hình ảnh chính */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/ImgFinger.png')}
          style={styles.image}
        />
      </View>

      {/* Văn bản mô tả */}
      <Text style={styles.title}>Enable Your Fingerprint</Text>
      <Text style={styles.description}>
        In order to log in into your account in a{'\n'} faster and safer way,
        add your {'\n'}fingerprint.
      </Text>

      {/* Hình ảnh Fingerprint */}
      <TouchableOpacity>
        <Image
          source={require('../../../assets/images/Fingerprint.png')}
          style={styles.fingerprintImage} // Sử dụng kiểu dáng mới cho Fingerprint
        />
      </TouchableOpacity>

      {/* Nút bấm */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('FavRestaurant')}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>

      {/* Nút bỏ qua */}
      <TouchableOpacity>
        <Text style={styles.skipText}>Skip this Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Sắp xếp các thành phần đều nhau theo chiều dọc
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40, // Thêm khoảng cách trên dưới cho đều
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  icon: {
    width: 24, // Đặt kích thước biểu tượng
    height: 24,
  },
  stepText: {
    fontSize: 16,
    color: '#989DA3',
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 270,
    height: 238,
    resizeMode: 'contain',
  },
  fingerprintImage: {
    width: 46,
    height: 52,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    // marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#989DA3',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    lineHeight: 25,
  },
  nextButton: {
    backgroundColor: '#F55F44',
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  skipText: {
    color: '#FF6F61',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default Finger;
