import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserOrder} from '../../../apiClient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Define Tab from createMaterialTopTabNavigator
const Tab = createMaterialTopTabNavigator();

const OrderScreen = ({status}) => {
  const navigation = useNavigation();
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await getUserOrder(userId, token, {status});
      const sortedOrders = fetchedOrders.sort(
        (a, b) => new Date(b.dateOrdered) - new Date(a.dateOrdered),
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false); // End refresh when done
    }
  };

  // Group orders by date
  const groupProductsByDate = orders => {
    return orders.reduce((acc, order) => {
      const date = new Date(order.dateOrdered).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupProductsByDate(orders);
  const groupedOrdersArray = Object.entries(groupedOrders); // Array of [date, orders]

  useEffect(() => {
    fetchOrders();
  }, [userId, token, status]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, [userId, token, status]);

  const handlePress = item => {
    navigation.navigate('OrderItemScreen', {item});
  };

  // Render order item
  const renderItem = ({item, index}) => {
    if (!item.restaurant?._id || !item.restaurant?.image || !item._id) {
      return null; // Avoid rendering invalid orders
    }

    const orderNumber = String(index + 1).padStart(3, '0'); // Order number padding

    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.orderCard}>
          <Image
            source={{uri: item.restaurant.image}}
            style={styles.restaurantImage}
          />
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
            <Text style={styles.restaurant}>{item.paymentMethob}</Text>
            <Text style={styles.totalPrice}>
              {formatCurrency(item.totalPrice)}
            </Text>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => handlePress(item)}>
              <Text style={styles.detailButtonText}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    );
  }
  console.log(orders);
  return (
    <FlatList
      data={groupedOrdersArray}
      keyExtractor={item => item[0]} // Using date as key for section header
      renderItem={({item: [date, products]}) => (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{date}</Text>
          </View>
          {products.map((product, index) => renderItem({item: product, index}))}
        </>
      )}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <ImageBackground
      source={require('../../../../assets/images/redFoodBgr.png')}
      style={styles.customTabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={styles.tabItem}>
            <Text
              onPress={onPress}
              style={[styles.tabText, isFocused && styles.tabTextFocused]}>
              {label}
            </Text>
            {isFocused && <View style={styles.tabIndicator} />}
          </View>
        );
      })}
    </ImageBackground>
  );
}

const Order = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);

  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0,
    );
    setItemCount(count);
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
            onPress={() =>
              navigation.navigate('CartStack', {screen: 'OrderDetail'})
            }>
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
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarLabelStyle: {
              fontSize: 14,
              color: 'white',
              textAlign: 'center',
            },
            tabBarStyle: {
              backgroundColor: 'orange',
            },
            tabBarIndicatorStyle: {
              backgroundColor: 'white',
              height: 3,
              borderRadius: 1.5,
            },
          }}>
          <Tab.Screen name="Coming">
            {() => <OrderScreen status="Coming" />}
          </Tab.Screen>
          <Tab.Screen name="Success">
            {() => <OrderScreen status="Success" />}
          </Tab.Screen>
          <Tab.Screen name="Failed">
            {() => <OrderScreen status="Failed" />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
      {/* This view now takes the entire space below the header */}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  //orderItem
  listContainer: {
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 19,
    marginTop: 10,
    marginLeft: 5,
    fontFamily: 'nunitoSan',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 2,
    width: 360,
    height: 130,
    margin: 15,

    alignSelf: 'center',
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    marginLeft: 30,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'nunitoSan',
  },
  restaurant: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
    fontFamily: 'nunitoSan',
  },
  totalPrice: {
    fontSize: 14,
    color: 'green',
    marginLeft: 4,
    fontFamily: 'nunitoSan',
  },
  detailButton: {
    backgroundColor: '#FF3D00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,

    flexDirection: 'row',
    position: 'absolute',
    width: 73,
    height: 29,
    marginLeft: 180,
    justifyContent: 'center',
  },

  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  //
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    marginTop: 12,
    height: 1,
    backgroundColor: '#ddd',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTabBar: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'orange',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  tabTextFocused: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabIndicator: {
    height: 2,
    width: '45%',
    backgroundColor: 'white',
    marginTop: 4,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  headView: {
    height: '15%',
    position: 'relative',
  },
  bodyView: {
    flex: 1,

    backgroundColor: 'white', // The rest of the body will have a white background
  },
  redFoodBgr: {
    width: '100%',
    height: 190,
    position: 'absolute',
  },
  menuView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 40,
  },
  titleBoldText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 120,
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
  menuView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    flexDirection: 'row',
    marginTop: '18%',
    alignItems: 'center',
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '3%',
  },
});
