import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {
  createPayment,
  getPaymentInfo,
  submitOrder,
  removeUserCartItem,
  cancelPayment,
  sendTransactions,
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

  // const restaurant2 = selectedBrand._id;
  // const contactString = selectedContact.selectedContact;
  const [cartIds, setCartIds] = useState([]);
  const attributeIds = cartItems2.map(item => item.attributeId);
  const [dataOrder, setDataOrder] = useState();
  const [orderId, setOrderId] = useState();
  ///
  const [amount, setAmount] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [counterAccountName, setCounterAccountName] = useState();
  const [counterAccountNumber, setCounterAccountNumber] = useState();
  const [description, Setdescription] = useState();

  const [reference, Setreference] = useState();
  const [transactionDateTime, setTransactionDateTime] = useState();

  // Log to see the result
  console.log('pa', paymentData);
  useEffect(() => {
    const ids = cartItems2.map(item => item.id);
    setCartIds(ids);
  }, [cartItems2]);

  // Log the extracted IDs
  console.log('data2', dataOrder);
  console.log('data', attributeIds);

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
      // handleSubmitOrder();
      // handleRemoveAllItems();
      navigate.navigate('Checkout5');
    }
  }, [isPaymentSuccessful]);
  console.log('data', dataOrder);
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
      <Image
        style={styles.qrBanner}
        source={require('../../../assets/images/qrlogo.png')}></Image>

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
      <Text style={styles.footerText}>Thank youfor your patience!</Text>
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
  qrBanner: {
    width: 212,
    height: 74,
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
