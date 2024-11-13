import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {
  createPayment,
  getPaymentInfo,
  submitOrder,
  removeUserCartItem,
  cancelPayment,
} from '../../apiClient';
import {setTransactionId} from '../../redux/slice/cartSlice';

const PaymentOS = () => {
  const navigate = useNavigation();
  const [paymentUrl, setPaymentUrl] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [polling, setPolling] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.auth.user?.token);
  const userId = useSelector(state => state.auth.user?.userId);
  const transactionId = useSelector(state => state.cart.transactionId);
  const cartItems2 = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const route = useRoute();
  const {selectedBrand, pickupTime, selectedContact} = route.params;
  const restaurant2 = selectedBrand._id;
  const contactString = selectedContact.selectedContact;
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    const ids = cartItems2.map(item => item.id);
    setCartIds(ids);
  }, [cartItems2]);

  const orderItems = cartItems2.map(item => ({
    quantity: item.quantity,
    drink: item.drink,
    excluded: item.excluded,
    attribute: item.attributeId,
  }));

  const handleCreatePayment = async () => {
    setLoading(true);
    try {
      const paymentData = {
        amount: 2000,
        orderCode: transactionId,
        description: 'Payment for order',
        cancelUrl: 'http://example.com/cancel',
        returnUrl: 'http://example.com/return',
        signature:
          'a75df5f205d404bccac19fca1e4055f83fa495bf15531d9e97b5dce43458e1df',
      };
      const paymentResponse = await createPayment(paymentData, token);
      setPaymentData(paymentResponse);
      setPaymentStatus(paymentResponse.status);
      setPolling(true);
    } catch (err) {
      console.log('Error creating payment:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPayment = async () => {
    if (!transactionId) return;
    setLoading(true);
    try {
      await cancelPayment(transactionId, token);
      setPaymentStatus('CANCELLED');
      dispatch(setTransactionId(null));
    } catch (err) {
      console.log('Error canceling payment:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    const shippingAddress = `${contactString}`;
    const restaurant = `${restaurant2}`;
    const paymentMethod = 'Bank Transfer';
    const status = 'Success';
    try {
      await submitOrder(
        orderItems,
        paymentMethod,
        userId,
        shippingAddress,
        restaurant,
        status,
        transactionId,
        token,
      );
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };

  useEffect(() => {
    handleCreatePayment();
  }, []);

  useEffect(() => {
    let intervalId;
    if (polling && transactionId) {
      intervalId = setInterval(async () => {
        setLoading(true);
        const paymentResponse = await getPaymentInfo(transactionId, token);
        console.log('Payment status:', paymentResponse.status);
        setPaymentStatus(paymentResponse.status);
        if (paymentResponse.status === 'PAID') {
          setIsPaymentSuccessful(true);
          setPolling(false);
        } else if (paymentResponse.status === 'CANCELLED') {
          setIsPaymentSuccessful(false);
          setPolling(false);
        }
        setLoading(false);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [polling, transactionId, token]);

  useEffect(() => {
    if (isPaymentSuccessful) {
      handleSubmitOrder();
      handleRemoveAllItems();
    }
  }, [isPaymentSuccessful]);

  const handleRemoveAllItems = async () => {
    try {
      for (const id of cartIds) {
        await removeUserCartItem(userId, token, id);
        console.log(`Item with ID ${id} removed from cart.`);
      }
      console.log('All items removed from cart successfully.');
      navigate.navigate('Checkout5');
    } catch (error) {
      console.error('Error removing items:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Status</Text>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#6200EE"
          style={styles.loadingIndicator}
        />
      )}
      <Text
        style={[
          styles.statusText,
          {
            color: isPaymentSuccessful
              ? 'green'
              : paymentStatus === 'CANCELLED'
              ? 'red'
              : '#333',
          },
        ]}>
        {isPaymentSuccessful
          ? 'Payment Successful!'
          : paymentStatus || 'Processing...'}
      </Text>
      {paymentData && paymentData.qrCode && (
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={paymentData.qrCode}
            size={180}
            color="black"
            backgroundColor="white"
          />
        </View>
      )}
      <Text style={styles.footerText}>Thank you for your patience!</Text>
    </View>
  );
};

export default PaymentOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  statusText: {
    fontSize: 18,
    marginVertical: 10,
  },
  qrCodeContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});
