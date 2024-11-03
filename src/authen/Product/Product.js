import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getProduct, getCategories} from '../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const filterContainerHeight = useSharedValue(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct();
        const categoryData = await getCategories();

        setProducts(productData);
        setCategories(categoryData);
        setFilteredProducts(
          productData.filter(product => product.category !== null),
        ); // Initialize filteredProducts
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (route.params && route.params.selectedCategories) {
      console.log('Selected Categories:', route.params.selectedCategories);
      filterProducts(route.params.selectedCategories);
    }
  }, [route.params]);

  const filterProducts = selectedCategories => {
    const newFilteredProducts = products.filter(
      product =>
        product.category &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category._id)), // Access category._id
    );
    setFilteredProducts(newFilteredProducts);
  };

  const renderProduct = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {productId: item._id});
      }}>
      <View style={styles.productCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleFilterOptions = () => {
    showFilterOptions ? closeFilterOptions() : openFilterOptions();
    setShowFilterOptions(!showFilterOptions);
  };

  const openFilterOptions = () => {
    filterContainerHeight.value = withTiming(150, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const closeFilterOptions = () => {
    filterContainerHeight.value = withTiming(0, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: filterContainerHeight.value,
      overflow: 'hidden',
    };
  });

  const toggleCategory = categoryId => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(item => item !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelectedCategories);
    // Re-filter products after toggling a category
    filterProducts(newSelectedCategories);
  };

  const isCategorySelected = categoryId => {
    return selectedCategories.includes(categoryId);
  };

  const handleReset = () => {
    // Call the filterProducts function to update the filtered products
    setSelectedCategories([]);
  };

  // Update the useEffect to listen to selectedCategories for filtering products
  useEffect(() => {
    filterProducts(selectedCategories); // Whenever selectedCategories changes, re-filter products
  }, [selectedCategories]);

  const renderCategoryItem = ({item}) => (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.optionCateBtn,
            isCategorySelected(item._id) && styles.optionFocusBtn,
          ]}
          onPress={() => toggleCategory(item._id)}>
          <Text
            style={[
              styles.optionText,
              isCategorySelected(item._id) && styles.optionFocusText,
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image
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
          <TouchableOpacity>
            <Image
              style={styles.iconMenuView}
              source={require('../../../assets/images/icons/FilterIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBoldText}>What's in Today?</Text>
        <TouchableOpacity onPress={toggleFilterOptions}>
          <View style={styles.containerF}>
            <Image
              style={styles.filter}
              source={require('../../../assets/images/icons/directionGreen.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Animated.View style={animatedStyle}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => (item.id ? item.id.toString() : item.name)}
          numColumns={3}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleReset}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </Animated.View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '3%',
  },
  iconMenuView: {
    width: 30,
    height: 30,
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
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    flexDirection: 'row',
    marginTop: '18%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headView: {
    width: '100%',
    height: '23%',
    backgroundColor: 'blue',
    marginBottom: '10%',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  productCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    margin: 10,
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
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productList: {
    paddingBottom: 20,
  },
  //animated filter
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
});
