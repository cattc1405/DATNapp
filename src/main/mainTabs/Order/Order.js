import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {getUserOrder} from '../../../apiClient';
const Tab = createMaterialTopTabNavigator();
const OrderScreen = ({status}) => {
  const navigation = useNavigation(); // Get navigation here
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [orders, setOrders] = useState([]);
  // Adjust as needed if items have a quantity property

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getUserOrder(userId, token, {status});
        setOrders(fetchedOrders); // Store the fetched orders in state
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [userId, token, status]); // Rerun the effect if userId, token, or status changes

  const handlePress = item => {
    // Navigate to OrderItemScreen and pass the item data
    navigation.navigate('OrderItemScreen', {item});
  };

  const renderOrderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}>
      <Text>{item.transactionId}</Text>
      <Text>
        Size: {item.paymentMethod} - Price: ${item.totalPrice}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabContent}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id} // Assuming each order has a unique 'id'
        renderItem={renderOrderItem}
      />
    </View>
  );
};

const Order = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);

  // Local state to keep track of the item count
  const [itemCount, setItemCount] = useState(0);

  // useEffect to update itemCount whenever cartItems changes
  useEffect(() => {
    // Calculate the total item count
    const count = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0,
    );
    setItemCount(count); // Update local state with the new count
  }, [cartItems]);
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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CartStack', {screen: 'OrderDetail'});
            }}>
            <View>
              <Image
                style={styles.iconImage}
                source={require('../../../../assets/images/icons/shopping-bag.png')}
              />
              <Text style={styles.iconText}>{itemCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Order</Text>
      </View>
      <View style={styles.bodyView}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarLabelStyle: {fontSize: 14},
            tabBarStyle: {backgroundColor: 'white'},
          }}>
          <Tab.Screen name="Pending">
            {() => <OrderScreen status="Pending" />}
          </Tab.Screen>
          <Tab.Screen name="Success">
            {() => <OrderScreen status="Success" />}
          </Tab.Screen>
          <Tab.Screen name="Failed">
            {() => <OrderScreen status="Failed" />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  iconImage: {
    width: 25,
    height: 25,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  itemContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: 300,
    height: 100,
    borderBlockColor: 'red',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },

  footerView: {
    width: '100%',
    height: '12%',
  },
  mainView: {
    height: '70%',
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
    paddingTop: 8,
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
    marginTop: 20,
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
    backgroundColor: 'white',
  },
  bodyView: {
    backgroundColor: 'white',
    flex: 1,
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
