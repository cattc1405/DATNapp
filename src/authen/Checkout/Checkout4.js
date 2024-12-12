import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {submitOrder, removeUserCartItem} from '../../apiClient';

const {width, height} = Dimensions.get('window'); // Lấy chiều rộng và chiều cao của màn hình
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import colors from '../../../assets/colors';
import CustomAlert from '../../CustomAlert';
const Checkout4 = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const route = useRoute();
  const {brand, contact} = route.params;
  console.log('Received brand:', brand);
  console.log('Received contact:', contact);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const handleOk = () => {
    setIsAlertVisible(false);
  };
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const handleChangeScreen = () => {
    if (selectedOption === 'Bank Transfer') {
      handleSubmitOrder();
      navigation.navigate('PaymentOS');
      console.log('Go payos');
    } else
    if (selectedOption === 'Cash') {
      handleSubmitOrder();
      navigation.navigate('Checkout5');
      console.log('Go cash');
    } else {
      setAlertMessage('Hãy chọn thanh toán bằng tiền mặt hoặc chuyển khoản!');
      setAlertTitle('Chưa chọn phương thức!');
      setIsAlertVisible(true);
    }
  };
  //order
  // const transactionId = useSelector(state => state.cart.transactionId);
  const transactionId3 = useSelector(state => state.cart.transactionId);
  const [cartIds, setCartIds] = useState([]);
  const [orderId, setOrderId] = useState();
  const token = useSelector(state => state.auth.user?.token);
  const userId = useSelector(state => state.auth.user?.userId);
  const cartItems2 = useSelector(state => state.cart.items);
  const orderItems = cartItems2.map(item => ({
    quantity: item.quantity,
    drink: item.drink,
    excluded: item.excluded,
    attribute:
    item.attributeId.length > 0
      ? item.attributeId.map(attribute => attribute.id)
      : [], 
  product: item.product,
  }));

  const handleSubmitOrder = async () => {
    const transaction2 = transactionId3;
    const shippingAddress = `${contact}`;
    const restaurant = `${brand}`;
    const paymentMethob = `${selectedOption}`;
    const status = 'Coming';
    // const transactionId = `${transactionId}`;
    const transactionId = `${transaction2}`;
    console.log('trans  ', transactionId);
    try {
      const orderResponse = await submitOrder(
        orderItems,
        paymentMethob,
        userId,
        shippingAddress,
        restaurant,
        status,
        transactionId,
        token,
      );

      console.log('Order Response:', orderResponse); // Log the response

      setOrderId(orderResponse._id);
      handleRemoveAllItems();
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };
  
  useEffect(() => {
    const ids = cartItems2.map(item => item.id);
    setCartIds(ids);
  }, [cartItems2]);

  const handleRemoveAllItems = async () => {
    try {
      for (const id of cartIds) {
        await removeUserCartItem(userId, token, id);
        console.log(`Item with ID ${id} removed from cart.`);
      }
      console.log('All items removed from cart successfully.');
      navigate.navigate('Checkout5');
    } catch (error) {
      console.log('Error removing items:', error);
    }
  };
  console.log('orderId', orderId);
  return (
    <View style={styles.container}>
        <CustomAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        // onCancel={handleCancel}
        onOk={handleOk}
      />
     <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backArrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 3/3</Text>
        <Image
          source={require('../../../assets/images/closeArrow.png')}
          style={styles.closeIcon}
        />
      </View>
      <Image
        source={require('../../../assets/images/backroundcheckout4.png')}
        style={styles.hamburger}
      />
      <Text style={styles.questionText}>
        How Do You Want To Pay For Your Order?
      </Text>
      <Text style={styles.subText}>
        Choose one of the following methods to payment your order.
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'Cash' && styles.optionSelected,
            { transform: [
                {scale: selectedOption === 'Cash' ? 1 : 0.8}, 
              ]}
          ]}
          onPress={() => handleOptionPress('Cash')}>
          <Image
            source={require('../../../assets/images/tienmat.jpg')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Tiền mặt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'Bank Transfer' && styles.optionSelected,
            { transform: [
                {scale: selectedOption === 'Bank Transfer' ? 1 : 0.8}, 
              ]}
          ]}
          onPress={() => handleOptionPress('Bank Transfer')}>
          <Image
            source={require('../../../assets/images/chuyenkhoan.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Chuyển khoản</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton}   onPress={handleChangeScreen}>
        <Text style={styles.nextButtonText}>Chọn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteBgr,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#999',

    fontFamily: 'nunitoSan',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  hamburger: {
    height:150,
    marginTop: 20,
    marginBottom: 40,
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị cắt mất
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'nunitoSan',
    color: '#000000',
  },
  subText: {
    width:'80%',
    fontSize: 15,
    color: '#989DA3',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    elevation:5,
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flex: 1,
    // width:'100%',
    alignItems: 'center',
    padding: 50,
    elevation:5,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginRight: 10,
    // borderWidth: 2,
    borderColor: 'transparent',

  },
  optionSelected: {
    elevation:1,
    borderColor: 'black',
    backgroundColor: 'rgba(252, 119, 18, 0.522);',

  },
  icon: {
    width: width * 0.2, // Kích thước icon là 20% chiều rộng màn hình
    height: width * 0.2,
    marginBottom: 10,
    borderRadius:50,
    // resizeMode: 'contain', // Đảm bảo hình ảnh không bị cắt
  },
  optionText: {
    fontSize: 14,
    textAlign:'center',
    // backgroundColor:'red',
    color: '#333',
    fontFamily: 'nunitoSan',
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
    fontFamily: 'nunitoSan',
  },
});

export default Checkout4;
