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
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  getProduct,
  getCategories,
  getFeaturedProduct,
  getProductSameDeal,
} from '../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import colors from '../../../assets/colors';
import { useSelector } from 'react-redux';

const Product = ({navigation}) => {
  // const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(''); // State for selected category name

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const filterContainerHeight = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [itemCount, setItemCount] = useState(0);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    fetchData();
    const count = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0,
    );
    setItemCount(count);
  }, [cartItems]);


  const fetchData = async () => {
    try {
      const [productData, categoryData] = await Promise.all([
        getProduct(), // Fetch products
        getCategories(), // Fetch categories
      ]);
      const validProducts = productData.filter(
        product => product.category !== null
      );

      console.log('Product data: ', productData)
      setProducts(productData);
      setCategories(categoryData);
      setFilteredProducts(validProducts);
      // setFilteredProducts(productData); // Show all products initially
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterProducts = (categoryId, categoryName) => {
    if (categoryId) {
      // Filter products by selected category
      const filtered = products.filter(
        product => product.category && product.category._id === categoryId,
      );
      setFilteredProducts(filtered);
    } else {
      // If no category is selected, show all products
      setFilteredProducts(products);
    }
    setSelectedCategoryName(categoryName); // Update the category name
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(prev => !prev);
    filterContainerHeight.value = withTiming(showFilterOptions ? 0 : 170, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    setSelectedCategories([categoryId]);
    filterProducts(categoryId, categoryName);
    // Filter products based on selected category
    setShowFilterOptions(false); // Optionally close filter after selection
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.optionCateBtn,
          selectedCategories.includes(item._id) && styles.optionFocusBtn,
        ]}
        onPress={() => handleCategorySelect(item._id, item.name)}>
        <Text
          style={[
            styles.optionText,
            selectedCategories.includes(item._id) && styles.optionFocusText,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', { productId: item._id });
      }}>
      <View style={styles.productsContainer}>
        <View style={styles.productImage}>
          <Image source={{ uri: item.image }} style={styles.productImage}></Image>
        </View>
        <Text numberOfLines={1} style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productDescription}>{item.description}</Text>

        <Text style={styles.productPrice}>
          {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ
        </Text>
        <View style={styles.button}>
          <ImageBackground
            source={require('../../../assets/images/icons/ov_shape.png')}
            style={{ width: 39, height: 18, justifyContent: 'center' }}>
            <Image
              source={require('../../../assets/images/icons/ov_shape_arr.png')}
              style={{
                alignSelf: 'center',
              }}></Image>

          </ImageBackground>
        </View>
      </View>


    </TouchableOpacity>
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: filterContainerHeight.value,
    overflow: 'hidden',
  }));
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedCategoryName(''); // Clear the category name

    fetchData();
  };
  const onHandleSearch = text => {
    setSearchQuery(text); // Update the search query directly
    const filteredProducts = products.filter(
      product =>
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.description.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filteredProducts);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <ImageBackground
          style={styles.redFoodBgr}
          source={require('../../../assets/images/redFoodBgr.png')}
        />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilterOptions}>
            <Image
              style={styles.iconMenuView2}
              source={require('../../../assets/images/icons/FilterIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>Our Products</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchContent}
            placeholder="Enter product name"
            value={searchQuery}
            onChangeText={onHandleSearch}></TextInput>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
            >
              <Image
                style={{ width: 19, height: 19, top: -27 }}
                source={require('../../../assets/images/icons/SearcCon.png')}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Category Filter Toggle */}
      <Animated.View style={animatedStyle}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 4,
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderColor: '#F55F44',
            borderBlockColor: '#F55F44',
          }}>
          <View style={styles.fliterHeader}>
            <Text style={styles.filterTextTilte}>
              Chọn danh mục bạn muốn tìm
            </Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.filterTextTilte2}>Clear all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item._id.toString()}
            numColumns={3}
            contentContainerStyle={styles.categoryList}
          />
        </View>
        <View style={styles.space}></View>
      </Animated.View>
      {/* Selected Category Title */}
      {selectedCategoryName ? (
        <Text style={styles.filterTextTilte3}>{selectedCategoryName}</Text>
      ) : null}
      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item._id.toString()}
        showsVerticalScrollIndicator={true}
        horizontal={false}
        numColumns={3} // Set the number of columns to 3
        key={'3-columns'}
      />
      <TouchableOpacity
        style={styles.allProductBtn}
        onPress={() =>
          navigation.navigate('CartStack', { screen: 'OrderDetail' })
        }>
        <View>
          <Image
            style={styles.iconImage}
            source={require('../../../assets/images/icons/cartIconOrange.png')}
          />
                      <Text style={styles.iconText}>{itemCount}</Text>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  iconImage:{
width:40,
height:40,
resizeMode:'contain'
  },
  iconText: {
    color: colors.orange1,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    right: -5,
    top: -15,
  },
  allPText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  allProductBtn: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopLeftRadiusRadius:20,
    // borderBottomLeftRadiusRadius:20,
    borderRadius: 30,

    // marginLeft:'20%',
    // borderWidth:2,
    // borderColor:colors.orange1,
    backgroundColor: colors.whiteBgr,
    position: 'absolute',
    height: 60,
    right: 10,
    bottom: 10,
    elevation: 15,


  },
  searchContent: {
    marginLeft: 27,
    // textAlignVertical:'bottom'
    // textAlign:'center'
  },
  fliterHeader: {
    width: '92%',
    marginLeft: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    width: '92%',
    marginLeft: '4%',
    height: 0.5,
    backgroundColor: 'black',
    marginTop: 12,
    marginBottom: 3
  },
  categoryList: {
    width: '100%',
    justifyContent: 'center', // Căn giữa
    alignItems: 'center',
  },
  inputContainer: {
    width: 385,
    height: 36,
    backgroundColor: '#F7F7F7',
    marginTop: 69,

    borderRadius: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  //

  filterTextTilte: {
    fontSize: 15,
    height: 20,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    marginLeft: '2%',
    marginBottom: 2,
    marginTop: '3%',
  },
  filterTextTilte2: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
    color: colors.orange1,
    marginRight: '5%',
    marginTop: '15%',
  },
  filterTextTilte3: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    marginLeft: '7%',
    marginTop: '4%',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
  },

  productDescription: {
    fontWeight: 'bold',
    fontSize: 9,
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
    elevation: 5,
    backgroundColor: 'white',

    margin: 10,
    marginLeft: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,

      // Android
      shadowRadius: 3,
    },
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
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
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
    marginTop: 80,
  },
  iconMenuView: {
    width: 25,
    height: 25,
    resizeMode: 'contain',

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
    height: 180,
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
    marginTop: 10,
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
  optionCateBtn: {
    backgroundColor: '#CBCED1',
    opacity: 0.25,
    borderRadius: 7,
    marginRight: 5,
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
    height: 80,
    backgroundColor: '#F55F44',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    fontFamily: 'nunitoSan',
    position: 'absolute',
    bottom: -20,
    width: '100%',
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
