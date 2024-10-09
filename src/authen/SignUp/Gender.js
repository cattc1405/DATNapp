import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
const Gender = () => {
    // State lưu trữ giới tính được chọn
    const [selectedGender, setSelectedGender] = useState(null);
  
    // Hàm để chọn giới tính
    const selectGender = (gender) => {
      setSelectedGender(gender);
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
          <Image
         source={require('../../../assets/images/Back.png')}/>
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 2/10</Text>
          <TouchableOpacity style={styles.closeButton}>
          <Image
              source={require('../../../assets/images/Exit.png')}/>
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
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backButton: {
      padding: 10,
    },
    arrow: {
      fontSize: 20,
    },
    stepText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 10,
    },
    closeText: {
      fontSize: 20,
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    image: {
      width: 150,
      height: 150,
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
      marginBottom: 20,
    },
    genderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    genderOption: {
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'transparent',
      width: 120,
    },
    selectedGenderOption: {
      borderColor: '#FF6347',
    },
    genderIcon: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
    genderText: {
      fontSize: 16,
    },
    nextButton: {
      backgroundColor: '#FF6347',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    nextButtonText: {
      color: 'white',
      fontSize: 18,
    },
    skipText: {
      textAlign: 'center',
      color: 'gray',
    },
  });

export default Gender