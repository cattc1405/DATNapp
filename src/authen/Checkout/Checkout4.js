import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {submitOrder, clearCart} from '../../apiClient';
const PaymentScreen = ({cartItems}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedCard, setSelectedCard] = useState(null); // State to track selected card

  const userId = useSelector(state => state.auth.user?.userId); // Retrieve the userId from the Redux store
  const token = useSelector(state => state.auth.user?.token);
  const attribute = '671f1d5cc97d28d8768e4057';
  console.log(userId);
  console.log(token);
  const handleCardSelect = cardType => {
    setSelectedCard(cardType); // Update selected card state
  };
  console.log(selectedCard);
  const orderItems = cartItems.map(item => ({
    quantity: item.quantity,
    drink: item.drink,
    excluded: item.excluded,
    // Add attribute if you have a corresponding value
    attribute: attribute,
    // Replace with the actual attribute value as needed
  }));
  const handleSubmitOrder = async () => {
    const shippingAddress = 'Your Shipping Address'; // Replace as needed
    const restaurant = '671e1da83cae0aee7d2e57da'; // Replace as needed
    const paymentMethod = selectedCard;

    try {
      await Promise.all([
        submitOrder(
          orderItems,
          paymentMethod,
          userId,
          shippingAddress,
          restaurant,
          token,
        ),
        clearCart(userId, token),
      ]);
      console.log('Order submitted and cart cleared successfully');
      // Optionally navigate or show success message here
    } catch (error) {
      console.error('Failed to submit order:', error); // User-friendly message could be shown here
    }
  };
  console.log(orderItems);
  return (
    <View style={styles.container}>
      {/* Phần đầu (Header) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 4/5</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Minh họa */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/backroundcheckout4.png')}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>What is Your Payment Method?</Text>

      {/* Phương thức thanh toán */}
      <View style={styles.paymentMethods}>
        <TouchableOpacity onPress={() => handleCardSelect('Credit Card')}>
          <Image
            source={require('../../../assets/images/cardapple.png')}
            style={[
              styles.paymentIcon,
              selectedCard === 'apple' && styles.selectedPaymentIcon, // Apply selected style
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCardSelect('PayPal')}>
          <Image
            source={require('../../../assets/images/cardpaypal.png')}
            style={[
              styles.paymentIcon,
              selectedCard === 'paypal' && styles.selectedPaymentIcon, // Apply selected style
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCardSelect('Bank Transfer')}>
          <Image
            source={require('../../../assets/images/cardvisa.png')}
            style={[
              styles.paymentIcon,
              selectedCard === 'visa' && styles.selectedPaymentIcon, // Apply selected style
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCardSelect('Cash')}>
          <Image
            source={require('../../../assets/images/cardmaster.png')}
            style={[
              styles.paymentIcon,
              selectedCard === 'master' && styles.selectedPaymentIcon, // Apply selected style
            ]}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            marginBottom: 15,
            fontWeight: 'bold',
            color: '#808080',
            fontFamily: 'nunitoSan',
          }}>
          PAYMENT DETAILS
        </Text>
      </View>
      {/* Thông tin thẻ */}
      <View style={styles.cardDetailsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Số thẻ"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Tên chủ thẻ"
          value={cardHolder}
          onChangeText={setCardHolder}
        />
        <View style={styles.cardInfoRow}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Ngày hết hạn"
            value={expirationDate}
            onChangeText={setExpirationDate}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Nút thanh toán */}
      <TouchableOpacity style={styles.payButton} onPress={handleSubmitOrder}>
        <Text style={styles.payButtonText}>Thanh toán </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

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
  backButton: {
    padding: 10,
  },
  closeButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'nunitoSan',
  },
  closeText: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'nunitoSan',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    fontFamily: 'nunitoSan',
  },
  illustrationContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  illustrationImage: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentIcon: {
    width: 75,
    height: 50,
  },
  selectedPaymentIcon: {
    borderColor: '#FF9966', // Change color to highlight the selected card
    borderWidth: 2,
    borderRadius: 10,
  },
  cardDetailsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '45%',
  },
  payButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
