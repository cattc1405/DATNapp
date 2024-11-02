import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getProduct} from '../../apiClient';

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct();
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts
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
    // Check if selectedCategories is empty
    if (selectedCategories.length === 0) {
      setFilteredProducts(products); // Show all products if no categories are selected
      return;
    }

    // If "All" is selected, show all products
    if (selectedCategories.includes('All')) {
      setFilteredProducts(products); // Show all products if "All" is selected
      return;
    }

    const filtered = products.filter(
      product => selectedCategories.includes(product.category), // Assuming each product has a 'category' field
    );
    setFilteredProducts(filtered);
  };

  const renderProduct = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {productId: item._id}); // Navigate to Detail screen with product ID
      }}>
      <View style={styles.productCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
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

          <TouchableOpacity onPress={() => navigation.navigate('filter')}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../assets/images/icons/FilterIcon.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleBoldText}>What's in Today?</Text>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.productList}
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
});
