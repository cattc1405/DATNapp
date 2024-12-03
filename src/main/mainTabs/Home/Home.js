import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import SlideNav from '../../slidenav/SlideNav';
import {useSelector} from 'react-redux'; // Import useSelector

import {getBrands, getFeaturedProduct} from '../../../apiClient';
import colors from '../../../../assets/colors';
const Home = () => {
  const navigation = useNavigation();
  const [isSlideNavVisible, setIsSlideNavVisible] = useState(false);
  const [brands, setBrand] = useState([]);
  const [productF, setProductF] = useState([]);
  const toggleSlideNav = () => {
    setIsSlideNavVisible(!isSlideNavVisible);
  };
  const authStatus = useSelector(state => state.auth.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  console.log('check', authStatus);
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const fetchData = async () => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrand(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProduct();
        setProductF(data);
      } catch (error) {
        console.error(error); // Added error variable to log
      }
    };

    await Promise.all([fetchFeatured(), fetchBrands()]); // Optional: fetch both simultaneously
  };

  const renderItemBrand = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantStack', {
          screen: 'BrandDetails',
          params: {brand: item}, // Passing the item data as params
        })
      }>
      <ImageBackground
        style={styles.itemPopularView}
        source={{uri: item.image}}
        imageStyle={{borderRadius: 15}}>
        <View style={styles.tagBrand}>
          <View style={styles.bestTag}>
            <Text style={styles.bestText}>BEST OFFER</Text>
          </View>
          <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
          <View style={styles.starView}>
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                style={styles.starIcon}
                source={
                  index < item.stars
                    ? require('../../../../assets/images/icons/StarBold.png')
                    : require('../../../../assets/images/icons/StarLight.png')
                }
              />
            ))}
            <Text style={styles.thinText}>
              ({item.review}) | {item.distance}1km away
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const renderItemOffer = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductStack', {
          screen: 'ProductDetail',
          params: {productId: item._id},
        })
      }>
      <View
        style={[
          styles.itemTodayView,
          {
            backgroundColor: index % 2 === 0 ? '#F55F44' : '#FFC425',
          },
        ]}>
        <View style={styles.bestTagOffer}>
          <Text style={styles.bestText}>BEST OFFER</Text>
        </View>
        <Text style={styles.brandText}>{item.name}</Text>
        <Text style={styles.describeText}>For only 30.000 VND</Text>
        <Image style={styles.productImg} source={{uri: item.image}} />
      </View>
    </TouchableOpacity>
  );
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = 200; // Adjust this based on your item width
    const index = Math.round(offsetX / itemWidth);
    setCurrentIndex(index);
  };
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
      <Modal
        visible={isSlideNavVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleSlideNav}>
        <View style={styles.modalContainer}>
          <SlideNav onClose={toggleSlideNav} />
        </View>
      </Modal>
      <View style={styles.headView}>
        <Image
          style={styles.redFoodBgr}
          source={require('../../../../assets/images/redFoodBgr.png')}
        />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={toggleSlideNav}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../../assets/images/MenuIcon.png')}
            />
          </TouchableOpacity>

          <Image
            style={styles.iconLogo}
            source={require('../../../../assets/images/whiteLogo.png')}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notifications');
            }}>
            <View>
              <Image
                style={styles.iconImage1}
                source={require('../../../../assets/images/icons/WhiteNoti.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.pointView}>
          <View style={styles.titleLine}>
            <Text style={styles.currentText}>Current Points</Text>
            <View style={styles.youthereView}>
              <Text style={styles.youthereText}>You are almost there!</Text>
            </View>
          </View>

          <View style={styles.treasureView}>
            <Image
              style={styles.diggerImg}
              source={require('../../../../assets/images/TreasureDigger.png')}
            />
            <View style={styles.pointTextView}>
              <Text style={styles.pointText}>
                Currently you have 125 points,
              </Text>
              <Text style={styles.pointText}>keep going to win rewards!</Text>
            </View>
          </View>
        </View> */}
      </View>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.titleAndViewall}>
            <Text style={styles.titleBoldText}>What's in Today?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('WhatsInToday')}>
              <Text style={styles.viewallText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* scrollview */}

          <FlatList
            ref={flatListRef}
            data={productF}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemOffer}
            keyExtractor={item => item._id}
            onScroll={handleScroll}
            snapToAlignment="center"
            snapToInterval={200} // Adjust this to match the width of each item
            decelerationRate="fast"
            pagingEnabled
          />

          {/* Paginator */}
          <View style={styles.paginator}>
            {productF.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {opacity: index === currentIndex ? 1 : 0.3},
                ]}
              />
            ))}
          </View>
          <View style={styles.titleAndViewall}>
            <Text style={styles.titleBoldText}>Popular Restaurants Nearby</Text>
            <TouchableOpacity>
              <Text style={styles.viewallText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={brands}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => renderItemBrand({item})}
            keyExtractor={item => item.id}
            style={styles.popularView}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({

  //Pagination for offer
  paginator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 28,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F55F44',
    marginHorizontal: 4,
  },
  //
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popularView: {
    height: 200,
  },
  thinText: {
    paddingLeft: 3,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'nunitoSan',
    color: '#9D9D9D',
  },
  iconImage1: {
    width: 25,
    height: 25,
  },
  starView: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 3,
  },
  nameText: {
    color: 'black',
    marginTop: 12,
    width:'56%',
    marginLeft: 20,
    fontFamily: 'nunitoSan',
    fontSize: 17,
    fontWeight: 'bold',
  },
  bestText: {
    color: 'white',
    padding: 7,
    paddingHorizontal: 12,
    fontSize: 10,
    fontFamily: 'nunitoSan',
    fontWeight: 'bold',
  },
  bestTag: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    right: -4,
    top: 8,
    backgroundColor: colors.orange1,
  },
  bestTagOffer: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    right: -4,
    top: 8,
    backgroundColor: colors.green,
  },
  tagBrand: {
    width: 230,
    height: 70,
    borderRadius: 10,
    left: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -20,
  },
  itemPopularView: {
    marginLeft: 20,
    width: 250,
    elevation:4,
    height: 160,
  },
  describeText: {
    fontSize: 14,
    width: '48%',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: -5,
    fontFamily: 'nunitoSan',
  },
  brandText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '700',
    margin: 15,
    fontFamily: 'nunitoSan',
  },
  productImg: {
    position: 'absolute',
    marginLeft: 145,
    marginTop: 45,

    width: 128,
    height: 80,
  },
  logo: {
    width: 20,
    marginLeft: 20,
    marginRight: 10,
    height: 20,
  },
  tagText: {
    fontSize: 13,
    marginRight: 20,
    fontWeight: '600',
    color: 'white',
  },
  tagView: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    right: -5,
    top: 20,
    height: 30,
    backgroundColor: 'rgb(67, 212, 101)',
  },
  itemTodayView: {
    width: 300,
    height: 125,
    marginLeft: 20,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#FFC425',
  },
  viewallText: {
    color: '#F55F44',
    fontSize: 15,
    fontWeight: '600',
  },
  titleBoldText: {
    fontSize: 20,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
  },
  titleAndViewall: {
    marginLeft: '7%',
    width: '86%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mainView: {
    marginTop: 20,
    backgroundColor: '#F7F6FB',
  },
  pointText: {
    fontSize: 13,
    fontFamily: 'nunitoSan',
    fontWeight: '600',
  },
  pointTextView: {
    marginLeft: 10,
  },
  treasureView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    height: 70,
    marginTop: 10,
    marginLeft: '10%',
  },
  diggerImg: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  youthereText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12.5,
    padding: 10,
    fontFamily: 'nunitoSan',
  },
  youthereView: {
    position: 'absolute',
    borderTopLeftRadius: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    right: 0,
    backgroundColor: '#F55F44',
  },
  currentText: {
    fontWeight: '700',
    color: '#000',
    fontSize: 15,
    paddingLeft: '10%',
    fontFamily: 'nunitoSan',
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  pointView: {
    width: '86%',
    height: 180,
    position: 'absolute',
    bottom: -110,
    marginLeft: '7%',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  iconLogo: {
    width: 200,
    height: 50,
  },
  iconLogoItem: {
    width: 140,
    height: 18,
    marginTop: 10,
    marginLeft: 15,
  },
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
  menuView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 100,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor:colors.whiteBgr,
    height: '100%',
  },
  headView: {
    width: '100%',
    height: '30%',
    backgroundColor: 'blue',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
