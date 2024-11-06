import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

const OrderItemScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {item} = route.params;
  console.log(item);

  // Function to render each order item
  const renderOrderItem = ({item}) => {
    return (
      <View style={styles.orderItem}>
        <Text style={styles.itemTitle}>{item.attribute.size}</Text>
        <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemDetail}>Drink: {item.drink}</Text>
        <Text style={styles.itemDetail}>Excluded: {item.excluded}</Text>
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
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/icons/SearchIcon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Order Item Details</Text>
      </View>

      {/* Order Info Section */}
      <View style={styles.inputNameView}>
        <Text style={styles.orderInfoText}>
          Status: <Text style={styles.boldText}>{item.status}</Text>
        </Text>
        <Text style={styles.orderInfoText}>
          Transaction ID:{' '}
          <Text style={styles.boldText}>{item.transactionId}</Text>
        </Text>
        <Text style={styles.orderInfoText}>
          Total Price: <Text style={styles.boldText}>${item.totalPrice}</Text>
        </Text>
        <Text style={styles.orderInfoText}>
          Shipping Address:{' '}
          <Text style={styles.boldText}>{item.shippingAddress}</Text>
        </Text>
        <Text style={styles.orderInfoText}>
          Branch: <Text style={styles.boldText}>{item.restaurant}</Text>
        </Text>
        <Text style={styles.orderInfoText}>
          Date: <Text style={styles.boldText}>{item.dateOrdered}</Text>
        </Text>
      </View>

      {/* FlatList to render orderItems */}
      <FlatList
        data={item.orderItems}
        renderItem={renderOrderItem}
        keyExtractor={orderItem => orderItem._id}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};
export default OrderItemScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headView: {
    width: '100%',
    height: '30%',
    backgroundColor: '#D9534F', // Red color to match the background image
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
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
    alignItems: 'center',
    marginTop: '18%',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  titleBoldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '5%',
    marginTop: '3%',
  },
  orderInfo: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  orderInfoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  orderItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#D9534F', // Accent red color
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: 370,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  flatList: {
    paddingBottom: 40, // Extra space at the bottom to prevent cut off
  },
  inputNameView: {
    marginBottom: 10,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    padding: 20,
  },
});
