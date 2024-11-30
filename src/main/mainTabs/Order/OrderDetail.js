import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getUserCart,
  updateUserCart,
  removeUserCartItem,
} from '../../../apiClient'; // Assuming you have a function to get product by ID
import {AuthContext} from '../../../../context/AuthContext';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
  setTransactionId,
} from '../../../redux/slice/cartSlice';
import colors from '../../../../assets/colors';

const OrderDetail = ({route}) => {
  const userId = useSelector(state => state.auth.user?.userId); // Retrieve the userId from the Redux store
  const token = useSelector(state => state.auth.user?.token); // Retrieve the token at the top level
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items); // or state.cart.cartItems depending on your slice structure
  const dispatch = useDispatch();
  console.log(userId);
  console.log(token);
  const [loading, setLoading] = useState(true); // Loading state
  const transactionId = useSelector(state => state.transactionId); // or state.cart.cartItems depending on your slice structure
  console.log('red', transactionId);
  const fetchUserCart = async () => {
    if (!userId || !token) return;

    try {
      setLoading(true);
      const data = await getUserCart(userId, token);
      dispatch(setCartItems(data.cart));
    } catch (err) {
      console.error('Error fetching user cart:', err);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUserCart();
    }, [userId, token]),
  );
  const handleIncrement = async id => {
    dispatch(incrementQuantity(id)); // Update in Redux store

    // Find the item and update API
    const item = cartItems.find(item => item.id === id);
    if (item) {
      await updateUserCart(userId, token, id, {quantity: item.quantity + 1});
    }
  };

  const handleDecrement = async id => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(decrementQuantity(id)); // Update in Redux store
      await updateUserCart(userId, token, id, {quantity: item.quantity - 1});
    }
  };

  const [editingItemId, setEditingItemId] = useState(null);

  const handleEditToggle = id => {
    setEditingItemId(editingItemId === id ? null : id);
  };
  const handleDelete = async id => {
    console.log('cartitem', id);
    await removeUserCartItem(userId, token, id);

    dispatch(removeCartItem(id));
  };
  const handleInfoRightPress = id => {
    if (editingItemId === id) {
      setEditingItemId(null);
    }
  };
  const renderItem = ({item}) => {
    const isEditing = editingItemId === item.id;

    // Sum the prices of all attributes
    const totalTop = item.attributeId.reduce(
      (sum, attribute) => sum + attribute.price,
      0,
    );

    // Calculate the total price for the item (attributes + product price * quantity)
    const itemTotalPrice = totalTop + item.price * item.quantity;

    const nameString = item.attributeId
      .map(attribute => attribute.size)
      .join(', ');

    return (
      <View style={styles.productItem}>
        <View
          style={[styles.imgLeft, isEditing && {width: 0, display: 'none'}]}>
          <Image style={styles.productImg} source={{uri: item.image}} />
          <View style={styles.quantityView}>
            <TouchableOpacity
              style={styles.orangeCircle}
              onPress={() => handleDecrement(item.id)}>
              <Image
                style={styles.iconQuantity}
                source={require('../../../../assets/images/icons/minusIcon.png')}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.orangeCircle}
              onPress={() => handleIncrement(item.id)}>
              <Image
                style={styles.iconQuantity}
                source={require('../../../../assets/images/icons/plusIcon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.infoRight, isEditing && styles.mrginLeft]}
          onPress={() => handleInfoRightPress(item.id)}>
          <Text style={styles.nameItem}>{item.name}</Text>
          <Text style={styles.thinGrayText}>Quantity: x{item.quantity}</Text>
          <Text style={styles.thinGrayText1}>Topping: {nameString}</Text>
          <Text style={styles.thinGrayText}>{item.note}</Text>

          <Text style={styles.priceText}>
            {' '}
            {new Intl.NumberFormat('vi-VN').format(itemTotalPrice)} VNĐ
          </Text>
        </TouchableOpacity>

        {isEditing ? (
          <TouchableOpacity
            style={styles.deleteView}
            onPress={() => handleDelete(item.id)}>
            <Image
              style={styles.iconQuantity}
              source={require('../../../../assets/images/icons/deleteItemIcon.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editItemView}
            onPress={() => handleEditToggle(item.id)}>
            <Text style={styles.editText}>Edit Menu</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Calculate the total price for all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const totalTop = item.attributeId.reduce(
        (sum, attribute) => sum + attribute.price,
        0,
      );
      const itemTotalPrice = totalTop + item.price * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  };

  const handleCheckout = () => {
    try {
      const createTransactionId = () => {
        const maxOrderCode = 9007199254740991;

        // Generate a random integer order code within the valid range (1 to maxOrderCode)
        const orderCode = Math.floor(Math.random() * maxOrderCode) + 1;

        // Ensure that the generated order code is within bounds and is a valid integer
        if (
          !Number.isInteger(orderCode) ||
          orderCode <= 0 ||
          orderCode > maxOrderCode
        ) {
          throw new Error('Generated order code is invalid.');
        }

        return orderCode;
      };
      const newTransactionId = createTransactionId();
      dispatch(setTransactionId(newTransactionId));
      console.log('New Transaction ID:', newTransactionId);
      // navigation.navigate('ConfirmOrder', {cartItems});
      navigation.navigate('CheckoutNavigator', { cartItems });
    } catch (err) {
      console.error('Error creating transaction ID:', err);
    }
  };
  // Function to create a new transaction ID

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image
          style={styles.redFoodBgr}
          source={require('../../../../assets/images/redFoodBgr.png')}
        />

        <View style={styles.menuView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.titleBoldText}>Order Details</Text>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/icons/3dotsIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainView}>
        {/* <FlatList
          data={products} // Data should be an array of product objects
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
        /> */}
        {/* <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        /> */}
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
        <View style={styles.totalAmountView}>
          <Text style={styles.totalText}>Total Amount:</Text>
          <Text style={styles.totalTextOrange}>
            {new Intl.NumberFormat('vi-VN').format(calculateTotalPrice())} VNĐ
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.footerView}>
        <View style={styles.totalView}>
          <Text style={styles.totalText}>
            {/* Total Amount: <Text style={styles.mgnL15}>${totalAmount}</Text> */}
          </Text>
         
        </View>
        
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  totalAmountView: {
    flexDirection: 'row',
    alignItems:'flex-end'
  },
  bagView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    alignItems: 'center',
  },
  quantityItem: {
    color: '#fff',
    marginLeft: 20,
    paddingVertical: 3,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  locateView: {
    flexDirection: 'row',
  },
  locateText: {
    color: '#fff',
    marginLeft: 30,
    paddingVertical: 3,
    fontSize: 12,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  orderText: {
    color: '#fff',
    opacity: 0.5,
    marginLeft: 30,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  mgnL15: {
    fontSize: 14,
  },
  brandTag: {
    height: '60%',
    backgroundColor: '#F55F44',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    fontFamily: 'nunitoSan',
  },
  checkoutText: {
    fontFamily: 'nunitoSan',
    fontSize: 17,
    color: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    borderRadius: 20,
    width: '86%',
    marginTop:10,
    marginLeft: '7%',
    height:46,
    justifyContent: 'center',
    alignItems:'center',    
    backgroundColor: '#F55F44',
  },
  totalTextOrange: {
    fontFamily: 'nunitoSan',
    fontSize: 17,
    color: colors.orange1,
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 10,
  },
  totalText: {
    fontFamily: 'nunitoSan',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 40,
  },
  totalView: {
    width: '86%',
    height: '40%',
    marginLeft: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerView: {
    width: '100%',
    height: '17%',
  },
  mainView: {
    height: '75%',
  },
  mrginLeft: {
    width: '80%',
    marginLeft: 40,
  },
  deleteView: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#FF7474',
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  editText: {
    fontFamily: 'nunitoSan',
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  editItemView: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#F55F44',
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  priceText: {
    fontFamily: 'nunitoSan',
    fontSize: 14,
    marginTop: 3,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  thinGrayText: {
    fontFamily: 'nunitoSan',
    fontSize: 12,
    color: '#9D9D9D',
    opacity: 0.5,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  thinGrayText1: {
    fontFamily: 'nunitoSan',
    fontSize: 12,
    color: '#9D9D9D',
    opacity: 0.5,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
    flexWrap: 'wrap',
  },
  nameItem: {
    fontFamily: 'nunitoSan',
    paddingTop: 24,
    paddingBottom: 5,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  quantityText: {
    fontFamily: 'nunitoSan',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  quantityView: {
    width: '32%',
    marginLeft: '20%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orangeCircle: {
    width: 26,
    height: 26,
    backgroundColor: '#F55F44',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImg: {
    width: 50,
    height: 80,
    marginLeft: '10%',
    marginTop: 20,
    resizeMode: 'contain',
    marginLeft: 30,
  },
  infoRight: {
    width: '60%',
    marginLeft: '5%',
    height: '100%',
  },
  imgLeft: {
    width: '35%',
    height: '100%',
  },
  productItem: {
    width: '80%',
    flexDirection: 'row',
    height: 140,
    marginTop: 15,
    marginBottom:10,
    backgroundColor: '#fff',
    elevation: 5,
    marginLeft: '10%',
    borderRadius: 20,
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '5%',
  },

  menuView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '18%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  headView: {
    width: '100%',
    height: '23%',
    backgroundColor: 'blue',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  //test
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F55F44',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
