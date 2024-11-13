import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getFeaturedProduct, getProductSameDeal} from '../../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const WhatsInToday = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [productF, setProductF] = useState([]);
  const [productSD, setProductSD] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const filterContainerHeight = useSharedValue(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  //ex
  const [isExpandedF, setIsExpandedF] = useState(false);
  const [isExpandedAll, setIsExpandedAll] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const animationHeight = useSharedValue(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch both data simultaneously using Promise.all
      const [featuredData, sameDealData] = await Promise.all([
        getFeaturedProduct(), // Fetch featured products
        getProductSameDeal(), // Fetch products on the same deal
      ]);

      // Set state with the fetched data
      setProductF(featuredData);
      setProductSD(sameDealData);
    } catch (error) {
      console.error('Error fetching data:', error); // Log the error
    }
  };

  console.log('product', productSD);
  // Animated style for expanding container
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isExpanded ? animationHeight.value : 0, {duration: 500}),
  }));

  // Toggle the visibility of additional items
  const handleToggleExpandFeatured = () => {
    setIsExpandedF(prev => !prev);
    animationHeight.value = isExpandedF ? 0 : productF.length * 15; // Adjust for your item height
  };
  const handleToggleExpandSameDeal = () => {
    setIsExpanded(prev => !prev);
    animationHeight.value = isExpanded ? 0 : productSD.length * -15; // Adjust for your item height
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductStack', {
          screen: 'ProductDetail',
          params: {productId: item._id},
        });
      }}>
      <View style={styles.productsContainer}>
        <View style={styles.productImage}>
          <Image source={{uri: item.image}} style={styles.productImage}></Image>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>

        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.button}>
          <ImageBackground
            source={require('../../../../assets/images/icons/ov_shape.png')}
            style={{width: 39, height: 18, justifyContent: 'center'}}>
            <Image
              source={require('../../../../assets/images/icons/ov_shape_arr.png')}
              style={{
                alignSelf: 'center',
              }}></Image>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <ImageBackground
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
          <TouchableOpacity>
            <Image
              style={styles.iconMenuView2}
              source={require('../../../../assets/images/icons/SearchIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>What's in Today?</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.menuView}>
          <Text style={styles.titleBoldText1}>Popular Featured</Text>
          <TouchableOpacity onPress={handleToggleExpandFeatured}>
            <Text style={styles.viewallText}>
              {isExpandedF ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* FlatList for initial items */}

        <View style={styles.sectionContainer}>
          <FlatList
            data={productF.slice(0, 3)}
            renderItem={renderProductItem}
            keyExtractor={item => item.id?.toString()}
            showsVerticalScrollIndicator={true}
            numColumns={3} // Show 3 items in a row
          />
        </View>

        {/* Animated container for additional items */}
        <ScrollView style={styles.scrollContainer}>
          <Animated.View style={[styles.expandedContainer, animatedStyle]}>
            <FlatList
              data={productF.slice(3)} // Show the remaining items
              renderItem={renderProductItem}
              keyExtractor={item => item.id?.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={3}
            />
          </Animated.View>
        </ScrollView>
        {/*--------------------Same----------------------- */}
        <View style={styles.menuView}>
          <Text style={styles.titleBoldText1}>1$ Deal</Text>
          <TouchableOpacity onPress={handleToggleExpandSameDeal}>
            <Text style={styles.viewallText}>
              {isExpanded ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* FlatList for initial items */}

        <View style={styles.sectionContainer}>
          <FlatList
            data={productSD.slice(0, 3)}
            renderItem={renderProductItem}
            keyExtractor={item => item.id?.toString()}
            showsVerticalScrollIndicator={true}
            numColumns={3} // Show 3 items in a row
          />
        </View>

        {/* Animated container for additional items */}
        <ScrollView style={styles.scrollContainer}>
          <Animated.View style={[styles.expandedContainer, animatedStyle]}>
            <FlatList
              data={productSD.slice(3)} // Show the remaining items
              renderItem={renderProductItem}
              keyExtractor={item => item.id?.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={3}
            />
          </Animated.View>
        </ScrollView>

        {/*--------------------ALL----------------------- */}
      </ScrollView>
      <View style={styles.menuView}>
        <Text style={styles.titleBoldText1}>View all</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductStack', {screen: 'Product'})
          }>
          <Text style={styles.viewallText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.brandTag}>
        <Text style={styles.orderText}>Order From</Text>
        <View style={styles.locateView}>
          <Text style={styles.locateText}>McDonald’s - Flat Bush Street</Text>
          <View style={styles.bagView}>
            <Image
              source={require('../../../../assets/images/icons/shoppingBag.png')}
            />
            {/* <Text style={styles.quantityItem}>{products.length} items</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WhatsInToday;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'nunitoSan',
    color: '#000000',
  },
  productDescription: {
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'nunitoSan',
    color: '#9D9D9D',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'nunitoSan',
    color: '#000000',
  },
  expandedContainer: {
    overflow: 'hidden', // Ensures items don't overflow the container
  },
  button: {
    width: 40,
    height: 18,
    position: 'absolute',
    bottom: -0.7,
    right: 0,
  },
  productsContainer: {
    width: 100,
    height: 140,
    borderRadius: 20,
    backgroundColor: 'white',

    margin: 10,
    marginLeft: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionContainer: {
    flex: 1,
    backgroundColor: '#F7F6FB',
  },
  //View all section
  titleAndViewall: {
    marginLeft: '7%',
    width: '86%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mainView: {
    backgroundColor: '#F7F6FB',
  },
  viewallText: {
    color: '#F55F44',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 16,
  },
  titleBoldText1: {
    fontSize: 20,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,

    backgroundColor: 'white',
  },

  iconContainer: {
    width: 12,
    height: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
    alignSelf: 'center',
  },

  containerF: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
    alignSelf: 'center',
  },
  filter: {
    width: 18,
    height: 18,
  },

  headView: {
    flex: 1,
    backgroundColor: 'blue',
  },

  productCardContainer: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  productCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 50,
    height: 46,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    lineHeight: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Spaces out the columns
  },
  productList: {
    paddingBottom: 20,
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '3%',
    position: 'absolute',
    marginTop: 120,
  },
  iconMenuView: {
    width: 25,
    height: 25,
    marginTop: 50,
  },
  iconMenuView2: {
    width: 25,
    height: 25,
    marginLeft: '5%',
    marginTop: 50,
  },
  containerF: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
    alignSelf: 'center',
  },
  menuView: {
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    flexDirection: 'row',

    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F6FB ',
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
  }, //animated filter
  filterOptionsContainer: {
    backgroundColor: 'white', // Background color of the filter options
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },

  filterButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  filterButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  //filter options
  buttonContainer: {
    margin: 5,

    alignItems: 'center',
  },
  optionFocusText: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 7,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 7,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
    // opacity: 0.75,
  },
  optionFocusBtn: {
    backgroundColor: '#FF5733',
    opacity: 1,
  },
  optionBtn: {
    backgroundColor: '#CBCED1',
    opacity: 0.25,
    borderRadius: 7,
    marginRight: 15,
  },
  // Filter and other styles remain unchanged
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
  },
  searchContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,

    width: '90%',
    alignSelf: 'center',
  },
  //itemproducts
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
  thinText: {
    paddingLeft: 3,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'nunitoSan',
    color: '#9D9D9D',
    marginLeft: 16,
  },
  ///brand
  brandTag: {
    height: 70,
    backgroundColor: '#F55F44',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    fontFamily: 'nunitoSan',
  },
  bagView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    alignItems: 'center',
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
    fontFamily: 'nunitoSan',
  },
  orderText: {
    color: '#fff',
    opacity: 0.5,
    marginLeft: 30,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
});
