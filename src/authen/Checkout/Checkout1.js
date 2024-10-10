import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Lấy chiều rộng và chiều cao của màn hình

const OrderScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.stepText}>Step 1/4</Text>
        <Image
          source={require('../../../assets/images/closeArrow.png')}
          style={styles.closeIcon}
        />
      </View>
      <Image
        source={require('../../../assets/images/hamburger.png')}
        style={styles.hamburger}
      />
      <Text style={styles.questionText}>How Do You Want To Receive Your Order?</Text>
      <Text style={styles.subText}>
        Choose one of the following methods to receive your order.
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'store' && styles.optionSelected,
          ]}
          onPress={() => handleOptionPress('store')}
        >
          <Image
            source={require('../../../assets/images/mcdonal.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Nhận tại cửa hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'uber' && styles.optionSelected,
          ]}
          onPress={() => handleOptionPress('uber')}
        >
          <Image
            source={require('../../../assets/images/uber.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Uber Eats</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Bước Tiếp Theo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Để chiếm toàn bộ chiều cao màn hình
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: '100%', // Chiếm toàn bộ chiều ngang màn hình
    height: '100%', // Chiếm toàn bộ chiều cao màn hình
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: 0,
  },
  hamburger: {
    marginTop: 20,
    marginBottom: 40,
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị cắt mất
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: 'black',
  },  
  icon: {
    width: width * 0.2, // Kích thước icon là 20% chiều rộng màn hình
    height: width * 0.2,
    marginBottom: 10,
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị cắt
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%', // Nút chiếm toàn bộ chiều ngang
    alignItems: 'center', // Canh giữa văn bản trong nút
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OrderScreen;
