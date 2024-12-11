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
  console.log('Orde', item.transactions);

  // Function to render each order item
  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const renderOrderItem = ({item}) => {
    const item2 = item.attribute;
    const attributeNames = item2.map(attr => attr.size);
    const attributeImage = item2.map(attr => attr.image);
    console.log('rend', attributeImage.join(' , '));
    return (
      <View style={{}}>
        <View style={styles.orderItem}>
          <View style={styles.Viewproduct}>
            <Image //image
              style={styles.restaurantImage}
              source={{uri: item.product.image}}
            />
            <View style={styles.orderInfo}>
              <Text style={styles.itemTitle}>{item.product.name}</Text>
              <Text style={styles.itemDetail}>
                Price: {formatCurrency(item.product.price)}
              </Text>

              <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemDetail2}>
                Topping: {attributeNames.join(' , ')}
              </Text>
            </View>
          </View>
          <View style={styles.toppingContainer}>
          <Text style={styles.toppingTitle}>Topping</Text>

            {item2.map((attr, index) => (
              <View key={index} style={styles.toppingItem}>
                <Image
                  style={styles.toppingImage}
                  source={{uri: attr.image}} // Display image of each attribute
                />
                <Text style={styles.itemDetail}>{attr.size}</Text>
                <Text style={styles.itemDetail}>
                  {formatCurrency(attr.price)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
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
            <Text style={styles.titleBoldText}>Order Item Details</Text>

            <TouchableOpacity>
              <Image
                source={require('../../../../assets/images/icons/SearchIcon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Info Section */}
        <View style={styles.inputNameView}>
          <Text style={styles.orderInfoText}>
            Status: <Text style={styles.boldText}>{item.status}</Text>
          </Text>
          {/* <Text style={styles.orderInfoText}>
            Transaction ID:{' '}
            <Text style={styles.boldText}>{item.transactionId}</Text>
          </Text> */}
          <Text style={styles.orderInfoText}>
            Total Price:{' '}
            <Text style={styles.boldText}>
              {formatCurrency(item.totalPrice)}
            </Text>
          </Text>
          <Text style={styles.orderInfoText}>
            Shipping Address:{' '}
            <Text style={styles.boldText}>{item.shippingAddress}</Text>
          </Text>
          <Text style={styles.orderInfoText}>
            Branch: <Text style={styles.boldText}>{item.restaurant?.name}</Text>
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
    </ScrollView>
  );
};
export default OrderItemScreen;
const styles = StyleSheet.create({
  toppingTitle: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop:10,
    color: 'black',
    width:'100%'
  },
  Viewproduct: {
    flexDirection: 'row',
  },
  toppingContainer: {
    flex: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderColor: '#CCCCCC',
  },
  toppingItem: {
    width: '33%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  toppingImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headView: {
    width: '100%',

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
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  icon: {
    width: 24,
    height: 24,
    
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  titleBoldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
   marginLeft: '5%',
    marginTop: '0%',
  },
  orderInfo: {
    paddingHorizontal: 20,
    marginVertical: 20,
    marginLeft: 10,
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
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC', // Accent red color
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
    width: 370,
    flexDirection: 'column',
  },
  restaurantImage: {
    width: 160,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  itemDetail2: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
    width: 150,
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
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
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
