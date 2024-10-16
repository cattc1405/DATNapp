import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Gender = (props) => {
  const { navigation } = props;
  const [selectedGender, setSelectedGender] = useState(null);

  const selectGender = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('Name')}>
          <Image source={require('../../../assets/images/Back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 2/10</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Image source={require('../../../assets/images/Exit.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Image ở giữa */}
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/Img3.png')} style={styles.image} />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>What is Your Gender?</Text>

      {/* Mô tả */}
      <Text style={styles.description}>
        To make sure you receive the best personalized offers we need to know your gender.
      </Text>

      {/* Chọn giới tính */}
      <View style={styles.genderContainer}>
        {/* Female Option */}
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'female' && styles.selectedGenderOption
          ]}
          onPress={() => selectGender('female')}
        >
          <Image source={require('../../../assets/images/Girl.png')} style={styles.genderIcon} />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>

        {/* Male Option */}
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'male' && styles.selectedGenderOption
          ]}
          onPress={() => selectGender('male')}
        >
          <Image source={require('../../../assets/images/Boy.png')} style={styles.genderIcon} />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
      </View>

      {/* Nút bấm */}
      <TouchableOpacity style={styles.nextButton} disabled={!selectedGender}>
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
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  genderOption: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    width: 140,
    elevation: 3, // tạo hiệu ứng bóng cho lựa chọn
  },
  selectedGenderOption: {
    borderColor: '#FF6347',
  },
  genderIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  },
  skipText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
});

export default Gender;
