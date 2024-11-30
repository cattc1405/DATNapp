import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useFocusEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getUserCart} from '../../../apiClient'; // Assuming you have a function to get product by ID
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
  setTransactionId,
} from '../../../redux/slice/cartSlice';
const ConfirmOrder = () => {
  const route = useRoute(); // Access route using the hook
  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.user?.userId); // Retrieve the userId from the Redux store
  const token = useSelector(state => state.auth.user?.token); // Retrieve the token at the top level
  const navigation = useNavigation();
  const {cartItems} = route.params; // Retrieve cartItems from route params
  console.log(userId);
  console.log(token);
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
  useEffect(() => {
    fetchUserCart();
  }, [userId, token]);
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
        </View>
        <TouchableOpacity
          style={[styles.infoRight, isEditing && styles.mrginLeft]}
          onPress={() => handleInfoRightPress(item.id)}>
          <Text style={styles.nameItem}>{item.name}</Text>
          <Text style={styles.thinGrayText}>Quantity: x{item.quantity}</Text>
          <Text style={styles.thinGrayText1}>Topping: {nameString}</Text>
          <Text style={styles.thinGrayText}>{item.note}</Text>
          <Text style={styles.priceText}>${itemTotalPrice}</Text>
        </TouchableOpacity>
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

          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/icons/3dotsIcon.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleBoldText}>Confirm Your Order</Text>
      </View>

      <View style={styles.mainView}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>

      <View style={styles.footerView}>
        <View style={styles.totalView}>
          <Text style={styles.couponText}>Coupon</Text>
          <Text style={styles.couponText}>-$2.50</Text>
        </View>
        <View style={styles.lineGray}></View>
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Amount:</Text>
          <Text style={styles.totalText}>${calculateTotalPrice()}</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => navigation.navigate('CheckoutNavigator', {cartItems})}>
          <Text style={styles.payText}>Proceed to Payment</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  lineGray: {
    width: '86%',
    marginLeft: '7%',
    marginVertical: 4,
    height: 0.4,
    backgroundColor: '#9D9D9D',
  },
  couponText: {
    fontFamily: 'nunitoSan',
    opacity: 0.75,
    fontSize: 14,
    color: '#9D9D9D',
    fontWeight: 'bold',
    alignItems: 'center',
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
  },
  orderText: {
    color: '#fff',
    opacity: 0.5,
    marginLeft: 30,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 'bold',
  },
  mgnL15: {
    fontSize: 14,
  },
  brandTag: {
    height: '60%',
    backgroundColor: '#F55F44',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  payText: {
    fontFamily: 'nunitoSan',
    fontSize: 17,
    color: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  payBtn: {
    height: 45,
    width: '66%',
    marginLeft: '17%',
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#F55F44',
  },
  totalText: {
    fontFamily: 'nunitoSan',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  totalView: {
    width: '86%',
    marginVertical: 10,
    justifyContent: 'space-between',
    marginLeft: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerView: {
    width: '100%',
    height: '30%',
  },
  mainView: {
    height: '57%',
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
  },
  thinGrayText: {
    fontFamily: 'nunitoSan',
    fontSize: 12,
    color: '#9D9D9D',
    opacity: 0.5,
    fontWeight: 'bold',
  },
  nameItem: {
    fontFamily: 'nunitoSan',
    paddingTop: 18,
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
  },
  quantityView: {
    width: '75%',
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
    width: '90%',
    height: 80,
    marginLeft: '10%',
    marginTop: 30,
    resizeMode: 'contain',
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
    marginTop: '7%',
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
    marginTop: '3%',
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
});
