import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUserOrder } from '../../../apiClient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Define Tab from createMaterialTopTabNavigator
const Tab = createMaterialTopTabNavigator();

const OrderScreen = ({ status }) => {
  const navigation = useNavigation();
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getUserOrder(userId, token, { status });
        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token, status]);

  const handlePress = item => {
    navigation.navigate('OrderItemScreen', { item });
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <Text style={styles.transactionId}>{item.transactionId}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>{item.paymentMethod}</Text>
        <Text style={styles.detailsText}>Total: ${item.totalPrice}</Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );

  const chunkOrders = (orders, chunkSize) => {
    let result = [];
    for (let i = 0; i < orders.length; i += chunkSize) {
      result.push(orders.slice(i, i + chunkSize));
    }
    return result;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.tabContent}>
      <FlatList
        data={chunkOrders(orders, 7)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FlatList
            data={item}
            keyExtractor={(subItem) => subItem.id.toString()}
            renderItem={renderOrderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        )}
        key={status}
      />
    </View>
  );
};

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <ImageBackground
      source={require('../../../../assets/images/redFoodBgr.png')}
      style={styles.customTabBar}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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
            <Text onPress={onPress} style={[styles.tabText, isFocused && styles.tabTextFocused]}>
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
    const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setItemCount(count);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image style={styles.redFoodBgr} source={require('../../../../assets/images/redFoodBgr.png')} />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../../assets/images/icons/whiteBackArrow.png')} />
          </TouchableOpacity>
          <Text style={{color:'white', fontSize: 20, fontWeight:'bold'}}>
            Order
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CartStack', { screen: 'OrderDetail' })}>
            <View>
              <Image style={styles.iconImage} source={require('../../../../assets/images/icons/shopping-bag.png')} />
              <Text style={styles.iconText}>{itemCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Order</Text>
      </View>

      {/* This view now takes the entire space below the header */}
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
          }}
        >
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
});
