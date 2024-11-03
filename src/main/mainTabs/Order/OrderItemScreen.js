import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const OrderItemScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Get navigation here
  // Destructure the item from the route params
  const {item} = route.params;
  console.log(item);

  // Function to render each order item
  const renderOrderItem = ({item}) => {
    return (
      <View style={styles.orderItem}>
        <Text style={styles.itemTitle}>{item.attribute.size}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Drink: {item.drink}</Text>
        <Text>Excluded: {item.excluded}</Text>
      </View>
    );
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
              source={require('../../../../assets/images/icons/SearchIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Order Item Details</Text>
      </View>

      <Text>Status: {item.status}</Text>
      <Text>Transaction ID: {item.transactionId}</Text>
      <Text>Total Price: ${item.totalPrice}</Text>
      <Text>Shipping Address: {item.shippingAddress}</Text>

      {/* FlatList to render orderItems */}
      <FlatList
        data={item.orderItems}
        renderItem={renderOrderItem}
        keyExtractor={orderItem => orderItem._id}
      />
    </View>
  );
};

export default OrderItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headView: {
    width: '100%',
    height: '23%',
    backgroundColor: 'white',
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
    display: 'flex',
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
