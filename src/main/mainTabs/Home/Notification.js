import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getUserOrder} from '../../../apiClient';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Notification = () => {
  const status = 'Success';
  const navigation = useNavigation();
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getUserOrder(userId, token, {status});
      const sortedOrders = fetchedOrders.sort(
        (a, b) => new Date(b.dateOrdered) - new Date(a.dateOrdered),
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId, token, status]);

  const renderOrderItem = ({item}) => {
    if (!item.restaurant?.name) {
      return null; // Do not render this order if the branch name is null or empty
    }

    return (
      <View style={styles.orderCard}>
        <View style={{width: '50%'}}>
          <Text style={styles.orderDate}>
            {new Date(item.dateOrdered).toLocaleDateString()}
          </Text>

          <Text style={styles.restaurantName}>
            Branch: {item.restaurant.name}
          </Text>
          <Image
            source={{uri: item.restaurant.image}}
            style={styles.restaurantImage}
          />
        </View>
        <View
          style={{
            width: '50%',
            borderLeftWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.orderTotal}>Total: ${item.totalPrice}</Text>
          <Text style={styles.paymentMethod}>
            Payment Method: {item.paymentMethob}
          </Text>
          <Text style={styles.transactionId}>
            Transaction ID: {item.transactionId}
          </Text>
          <Text style={styles.orderStatus}>Status: {item.status}</Text>
        </View>
      </View>
    );
  };

  console.log(orders);
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
              style={styles.iconMenuView}
              source={require('../../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Notification</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headView: {
    width: '100%',
    height: '23%',
    backgroundColor: 'blue',
    marginBottom: 10,
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
  listContent: {
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
  },
  restaurantName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  restaurantImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginVertical: 10,
  },

  orderDate: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 14,
    color: '#555',
  },
  orderTotal: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#777',
    marginLeft: 10,
  },
  transactionId: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginLeft: 10,
  },
  orderStatus: {
    fontSize: 14,
    color: '#008000',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
});
