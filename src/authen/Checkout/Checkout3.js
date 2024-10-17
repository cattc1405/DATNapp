import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider'; // Đã sửa lỗi import Slider

const Checkuot3 = () => {
  const [pickupTime, setPickupTime] = useState(1); // Thời gian ban đầu được đặt là 1 phút

  return (
    <View style={styles.container}>
      {/* Phần đầu (Header) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 3/5</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Minh họa */}
      <View style={styles.illustrationContainer}>
            <Image
            source={require('../../../assets/images/backroundcheckuot3.png')}/>
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>Bạn sẽ mất bao lâu để lấy đơn hàng của mình?</Text>

      {/* Mô tả */}
      <Text style={styles.description}>
        Để đảm bảo bạn nhận được đơn hàng một cách tốt nhất và còn nóng, chúng tôi cần một ước tính về thời gian bạn sẽ đến lấy đơn hàng.
      </Text>

      {/* Thanh trượt thời gian */}
      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{pickupTime} phút{pickupTime > 1 ? '' : ''}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          step={1}
          value={pickupTime}
          onValueChange={value => setPickupTime(value)}
          minimumTrackTintColor="#FF5733"
          maximumTrackTintColor="#d3d3d3"
        />
      </View>

      {/* Nút "Tiếp tục" */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkuot3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
  },
  closeButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  closeText: {
    fontSize: 28,
    color: '#000',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  illustrationContainer: {
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 150,
    height: 150,
    backgroundColor: '#f0f0f0', // Chỗ để ảnh minh họa
    borderRadius: 75,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  sliderContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  nextButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
