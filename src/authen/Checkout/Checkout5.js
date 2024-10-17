import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Checkuot5 = () => {
  return (
    <View style={styles.container}>
      {/* Phần đầu (Header) */}
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 4/4</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Hình ảnh minh họa */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/backroundcheckout5.png')} // Thay thế bằng ảnh minh họa của bạn
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* Tiêu đề thông báo */}
      <Text style={styles.title}>Your Order Has Been Placed Successfully!</Text>

      {/* Mô tả chi tiết */}
      <Text style={styles.description}>
        Your order has been successfully completed. Within moments you will receive a notification
        with the receipt of your purchase and you can track every step of your order.
      </Text>

      {/* Nút hoàn thành */}
      <TouchableOpacity style={styles.finishButton}>
        <Text style={styles.finishButtonText}>Finish Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkuot5;

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
    marginBottom: 20,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginLeft: '40%'
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 28,
    color: '#000',
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 300,
    height: 300, // Tùy chỉnh kích thước hình ảnh
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: '35%'
  },
  finishButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
