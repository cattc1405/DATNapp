import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Order = () => {
  const navigation = useNavigation();


  const [productData, setProductData] = useState([
    {
      id: '1',
      name: 'Big Mac Menu',
      size: 'Normal',
      quantity: 1,
      price: 12.5,
      note: 'No pickles',
      imgSrc: require('../../../../assets/images/BigMac.png'),
    },
    {
      id: '2',
      name: 'Double Cheeseburger',
      size: 'Double',
      quantity: 1,
      note: 'No Onions',
      price: 2.0,
      imgSrc: require('../../../../assets/images/CheesseB.png'),
    },
    {
      id: '3',
      name: 'Big Mac Menu',
      size: 'Normal',
      quantity: 1,
      price: 12.5,
      note: 'No pickles',
      imgSrc: require('../../../../assets/images/BigMac.png'),
    },
    {
      id: '4',
      name: 'Double Cheeseburger',
      size: 'Double',
      quantity: 1,
      note: 'No Onions',
      price: 2.0,
      imgSrc: require('../../../../assets/images/CheesseB.png'),
    },
  ]);


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

        <Text style={styles.titleBoldText}>Order</Text>
      </View>

      <View style={styles.mainView}>

      </View>

      <View style={styles.footerView}>


        <View style={styles.brandTag}>
          <Text style={styles.orderText}>Order From</Text>
          <View style={styles.locateView}>
            <Text style={styles.locateText}>McDonald’s - Flat Bush Street</Text>
            <View style={styles.bagView}>
              <Image
                source={require('../../../../assets/images/icons/shoppingBag.png')}
              />
              <Text style={styles.quantityItem}>2 items</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
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
    fontFamily: 'nunitoSan'
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
    fontFamily: 'nunitoSan'
  },
  orderText: {
    color: '#fff',
    opacity: 0.5,
    marginLeft: 30,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan'
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
    backgroundColor: 'blue',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
