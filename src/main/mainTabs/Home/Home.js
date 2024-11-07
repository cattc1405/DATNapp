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
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import SlideNav from '../../slidenav/SlideNav';
import {useSelector} from 'react-redux'; // Import useSelector

import {getBrands, getFeaturedProduct} from '../../../apiClient';
const Home = () => {
  const navigation = useNavigation();
  const [isSlideNavVisible, setIsSlideNavVisible] = useState(false);
  const [brands, setBrand] = useState([]);
  const [productF, setProductF] = useState([]);
  const toggleSlideNav = () => {
    setIsSlideNavVisible(!isSlideNavVisible);
  };
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
          <Text style={styles.nameText}>{item.name}</Text>
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
              ({item.review}) | {item.distance} away
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const renderItemOffer = ({item}) => (
    <ImageBackground
      style={styles.itemTodayView}
      source={{uri: item.image}}
      imageStyle={{borderRadius: 15}}>
      <Image style={styles.productImg} source={item.image} />
      <View style={styles.tagView}>
        <Image style={styles.logo} source={item.logoImage} />
        <Text style={styles.tagText}>NEW</Text>
      </View>
      <Text style={styles.brandText}>{item.name}</Text>
      <Text style={styles.describeText}>{item.description}</Text>
    </ImageBackground>
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
              navigation.navigate('CartStack', {screen: 'OrderDetail'});
            }}>
            <View>
              <Image
                style={styles.iconImage1}
                source={require('../../../../assets/images/noti.png')}
              />
              <Text style={styles.iconText}>{itemCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.pointView}>
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
              <Text style={styles.pointText}>
                keep going to win amazing rewards!
              </Text>
            </View>
          </View>
        </View>
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
            data={productF}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemOffer}
            keyExtractor={item => item.id}
          />
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
  iconImage1:{
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
    marginLeft: 20,
    fontFamily: 'nunitoSan',
    fontSize: 18,
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
    backgroundColor: '#F55F44',
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
    height: 160,
  },
  describeText: {
    fontSize: 16,
    width: '45%',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: -5,
    fontFamily: 'nunitoSan',
  },
  brandText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    margin: 15,
    fontFamily: 'nunitoSan',
  },
  productImg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '55%',
    height: '100%',
    resizeMode: 'contain',
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
    marginTop: 110,
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
    marginTop: '18%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
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
