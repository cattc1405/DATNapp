import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const Findme = () => {
  // Dữ liệu mẫu đơn hàng
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: '#001',
      restaurant: 'GoodGood CN 1',
      totalPrice: '300.000',
      date: 'TODAY',
    },
    {
      id: '2',
      orderNumber: '#002',
      restaurant: 'GoodGood CN 1',
      totalPrice: '300.000',
      date: 'TODAY',
    },
    {
      id: '3',
      orderNumber: '#002',
      restaurant: 'GoodGood CN 1',
      totalPrice: '300.000',
      date: 'YESTERDAY',
    },
    {
      id: '4',
      orderNumber: '#004',
      restaurant: 'GoodGood CN 2',
      totalPrice: '450.000',
      date: 'YESTERDAY',
    },
    {
      id: '5',
      orderNumber: '#005',
      restaurant: 'GoodGood CN 2',
      totalPrice: '350.000',
      date: 'YESTERDAY',
    },
    {
      id: '6',
      orderNumber: '#006',
      restaurant: 'GoodGood CN 3',
      totalPrice: '500.000',
      date: 'YESTERDAY',
    },
    {
      id: '7',
      orderNumber: '#007',
      restaurant: 'GoodGood CN 4',
      totalPrice: '200.000',
      date: 'YESTERDAY',
    },
  ]);

  // Render từng mục đơn hàng
  const renderItem = ({item}) => (
    <View style={styles.orderCard}>
      <Image
        source={require('../../../../assets/images/redFoodBgr.png')}
        style={styles.restaurantImage}
      />
      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>Order {item.orderNumber}</Text>
        <Text style={styles.restaurant}>{item.restaurant}</Text>
        <Text style={styles.totalPrice}>Total price: {item.totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

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
              navigation.navigate('BrandMap');
            }}>
            <View>
              <Image
                style={styles.iconImage}
                source={require('../../../../assets/images/icons/SearchIcon.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.titleBoldText}>Nearby Branch</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Findme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backwhite: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  clearAllText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FF3D00',
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    color: '#FF3D00',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurant: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  totalPrice: {
    fontSize: 14,
    color: '#333',
  },
  detailButton: {
    backgroundColor: '#FF3D00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: 318,
    marginTop: 10,
    width: 73,
    height: 29,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  separator: {
    height: 16,
  },
  //Header
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
