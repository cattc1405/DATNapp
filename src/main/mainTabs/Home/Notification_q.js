import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const data = [
  {
    id: '1',
    title: 'MC Menu',
    message:
      'Happy Birthday, Mafalda! Stop by our coffee and enjoy a free coffee to help you celebrate your birthday!',
    time: '10 minutes ago',
    date: 'JAN 05',
    isNew: true,
  },
  {
    id: '2',
    title: "McDonald's",
    message:
      'Good Night, Mafalda! We noticed that you’re passing by our restaurants, so come visit us and take a look at our coupons!',
    time: '11:22 pm',
    date: 'JAN 05',
  },
  {
    id: '3',
    title: 'Exclusive Offers',
    message:
      'Good Morning Mafalda! We have a lot of new offers to you. Stop by your favorite restaurants to enjoy it!',
    time: '9:05 am',
    date: 'JAN 05',
  },
  {
    id: '4',
    title: 'Happy New Year',
    message:
      'Happy New Year Mafalda! “Tomorrow is the first blank page of a 365 page book. Write a good one”.',
    time: '8:01 am',
    date: 'JAN 01',
  },
  {
    id: '5',
    title: 'Happy New Year',
    message:
      'Happy New Year Mafalda! “Tomorrow is the first blank page of a 365 page book. Write a good one”.',
    time: '8:01 am',
    date: 'JAN 01',
  },
  {
    id: '6',
    title: 'H Ne ar',
    message:
      'Happy New Year Mafalda! “Tomorrow is the first blank page of a 365 page book. Write a good one”.',
    time: '8:01 am',
    date: 'JAN 01',
  },
  {
    id: '7',
    title: 'Happ23',
    message:
      'Happy New Year Mafalda! “Tomorrow is the first blank page of a 365 page book. Write a good one”.',
    time: '8:01 am',
    date: 'JAN 01',
  },
  {
    id: '8',
    title: 'appyNe ear',
    message:
      'Happy New Year Mafalda! “Tomorrow is the first blank page of a 365 page book. Write a good one”.',
    time: '8:01 am',
    date: 'JAN 01',
  },
];
import {getUserOrder, getFeaturedProduct, getProduct} from '../../../apiClient';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Notification1 = () => {
  const status = 'Success';
  const navigation = useNavigation();
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [productF, setProductF] = useState([]);

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
    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const fetchData = async () => {
    const fetchFeatured = async () => {
      try {
        const data = await getProduct();
        const sortedOrders = data.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated),
        );
        setProductF(sortedOrders);
      } catch (error) {
        console.error(error); // Added error variable to log
      }
    };

    await Promise.all([fetchFeatured()]); // Optional: fetch both simultaneously
  };
  const groupProductsByDate = products => {
    return products.reduce((acc, product) => {
      const date = new Date(product.dateCreated).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(product);
      return acc;
    }, {});
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const groupedProducts = groupProductsByDate(productF);
  const groupedProductsArray = Object.entries(groupedProducts);
  console.log(productF);
  const renderProductItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductStack', {
          screen: 'ProductDetail',
          params: {productId: item._id},
        })
      }>
      <View style={styles.notificationCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}> {item.name}</Text>
          <Text style={styles.notificationTime}>{item.description}</Text>
          <Text style={styles.notificationMessage}>
            {formatCurrency(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('BrandMap')}>
            <View>
              <Image
                style={styles.iconImage}
                source={require('../../../../assets/images/icons/SearchIcon.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Notification</Text>
      </View>
      <View style={styles.Viewlist}>
        <FlatList
          data={groupedProductsArray}
          keyExtractor={item => item[0]} // date as the key
          renderItem={({item: [date, products]}) => (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{date}</Text>
              </View>
              {products.map(product => renderProductItem({item: product}))}
            </>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

export default Notification1;

const styles = StyleSheet.create({
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 19,

    fontFamily: 'nunitoSan',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backwhite: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  Viewlist: {
    paddingHorizontal: 20,
  },
  textMonth: {
    color: '#979DA3',
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: 15,
    marginLeft: '5%',
    fontFamily: 'nunitoSan',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FF3D00',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    fontFamily: 'nunitoSan',
  },
  clearAllText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 20,
  },
  separator: {
    height: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderColor: '#F55F44',
    margin: 10,
  },
  newIndicator: {
    width: 4,
    height: '100%',
    backgroundColor: '#FF3D00',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'red',
    fontFamily: 'nunitoSan',
  },
  notificationTime: {
    color: '#888',
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: 'nunitoSan',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
    fontFamily: 'nunitoSan',
  },
  //
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
