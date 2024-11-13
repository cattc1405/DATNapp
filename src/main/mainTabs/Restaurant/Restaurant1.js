import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getBrands} from '../../../apiClient';
import {useSelector} from 'react-redux'; // Import useSelector
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Restaurant1 = ({navigation}) => {
  const [brands, setBrand] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrand(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  }, []);
  // Dữ liệu mẫu cho danh sách nhà hàng

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() =>
        navigation.navigate('RestaurantStack', {
          screen: 'BrandDetails',
          params: {brand: item},
        })
      }>
      <Image source={{uri: item.image}} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantAddress}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.reviewText}>({item.review})</Text>
        </View>
      </View>
      <View style={styles.offerBadge}>
        <Text style={styles.offerText}>{item.offers}</Text>
      </View>
    </TouchableOpacity>
  );
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
        data={brands}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer} // giống ScrollView của bạn
      />
    </View>
  );
};

export default Restaurant1;

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
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#ff5a5f',
    padding: 16,
    flexDirection: 'row', // Thay đổi thành row để căn chỉnh theo hàng ngang
    alignItems: 'center',
    justifyContent: 'space-between', // Căn đều các phần tử
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    padding: 8,
  },
  scrollContainer: {
    padding: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  restaurantAddress: {
    color: '#888',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    color: '#ffcc00',
    marginRight: 4,
  },
  reviewText: {
    color: '#888',
    fontFamily: 'nunitoSan',
  },
  offerBadge: {
    backgroundColor: '#F55F44',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  offerText: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
    marginVertical: 3,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
});
