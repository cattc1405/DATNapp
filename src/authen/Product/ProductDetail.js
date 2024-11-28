import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getAttributeByProductId, getProductById} from '../../apiClient'; // Assuming you have a function to get product by ID
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {addUserCart} from '../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withClamp,
} from 'react-native-reanimated';
const ProductDetail = ({route}) => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState();

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const userId = useSelector(state => state.auth.user?.userId);
  const [attributePrice, setAttributePrice] = useState(null);
  const {productId} = route.params; // Retrieve the productId from route parameters
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState();
  const [localUserId, setLocalUserId] = useState(null);
  const token = useSelector(state => state.auth.user?.token); // Retrieve the token at the top level
  console.log('type - top', selectedItems);
  // Send to cartUser
  const [itemOrder, setItemOrder] = useState([]);
  const addToCart = async () => {
    try {
      const newItem = {
        id: Math.random().toString(),

        attributeId: selectedItems,

        image: product.image,
        name: product.name,
        price: product.price,

        quantity: 1,

        userId: userId, // Use the current user's ID
      };

      setItemOrder(prevItems =>
        Array.isArray(prevItems) ? [...prevItems, newItem] : [newItem],
      );
      const addCart = async () => {
        if (itemOrder.length > 0 && userId && token) {
          try {
            const response = await addUserCart(userId, itemOrder, token);
            console.log('Cart updated successfully:', response);
          } catch (error) {
            console.error(
              'Failed to add cart:',
              error.response ? error.response.data : error.message,
            );
          }
        }
      };
      addCart();
    } catch (error) {
      console.error('Error in addToCart:', error);
    }
  };

  console.log(itemOrder);
  useEffect(() => {
    console.log('Updated Item Order:', itemOrder);
  }, [itemOrder]);

  // Effect to update local state when userId changes
  useEffect(() => {
    if (userId) {
      setLocalUserId(userId);
    } else {
      setLocalUserId(null); // Reset local state if userId is not available
    }
  }, [userId]);
  console.log(itemOrder);
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await getProductById(productId);

        setProduct(productDetail);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);
  console.log('Product', product);
  const handleSelectType = (type, price, name) => {
    setSelectedType(type);
    setPrice(price);
    setSize(name);
    setAttributePrice(price);
  };

  const handleSelectDrink = drink => {
    setSelectedDrink(drink);
  };
  // const handleSelectItem = item => {
  //   if (selectedItems.includes(item)) {
  //     setSelectedItems(selectedItems.filter(i => i !== item));
  //   } else {
  //     setSelectedItems([...selectedItems, item]);
  //   }
  // };
  const renderAttributes = () => (
    <FlatList
      data={product.attributes}
      keyExtractor={item => item._id}
      renderItem={({item}) =>
        item.isActive ? (
          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === item.size && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType(item.size)}>
            <Text style={styles.attributeText}>
              {item.size} - ${item.price}
            </Text>
          </TouchableOpacity>
        ) : (
          // Optionally render inactive button or an empty view
          <View style={styles.inactiveBtn}>
            <Text style={styles.inactiveText}>
              {item.size} - ${item.price}
            </Text>
          </View>
        )
      }
    />
  );
  const handleSelectItem = item => {
    const selectedItem = {
      id: item._id,
      size: item.size,
      price: item.price,
    };

    const isItemSelected = selectedItems.some(
      selected =>
        selected.id === selectedItem.id && selected.size === selectedItem.size,
    );

    if (isItemSelected) {
      // Deselect item by filtering it out from the selectedItems array
      setSelectedItems(
        selectedItems.filter(
          selected =>
            selected.id !== selectedItem.id ||
            selected.size !== selectedItem.size,
        ),
      );
    } else {
      // Add item to the selectedItems array
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  /// Slidedown animation
  const [isExpanded, setIsExpanded] = useState(false);
  const animationHeight = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isExpanded ? animationHeight.value : 0, {
      duration: 500,
      easing: Easing.ease, // Smooth easing for the animation
    }),
  }));
  const handleToggleExpandSameDeal = () => {
    setIsExpanded(prev => !prev);
    animationHeight.value = isExpanded ? 0 : product.attributes.length * -15; // Adjust for your item height
  };

  const renderTopping = ({item}) => {
    if (!item.image || !item.size || !item.price) return null;

    const isSelected = selectedItems.some(
      selected =>
        selected.id === item._id &&
        selected.size === item.size &&
        selected.price === item.price,
    );

    return (
      <TouchableOpacity onPress={() => handleSelectItem(item)}>
        <View style={styles.ingredientsListView}>
          <View style={styles.ingredientView}>
            <View style={{width: 14, height: 14, position: 'absolute'}}>
              <Image
                style={{marginLeft: 40}}
                source={
                  isSelected
                    ? require('../../../assets/images/icons/checkProduct.png') // Checked image
                    : require('../../../assets/images/icons/uncheckProduct.png') // Unchecked image
                }
              />
            </View>
            <View style={styles.ingredientImgView}>
              <Image style={styles.ingredientImg} source={{uri: item.image}} />
            </View>
            <Text style={styles.nameIngre}>{item.size}</Text>
            <Text style={styles.priceIngre}>{formatCurrency(item.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const renderProductDetail = () => {
    if (product) {
      return (
        <ScrollView
          style={styles.productContainer}
          contentContainerStyle={styles.centeredContent}>
          <ImageBackground
            style={styles.redFoodBgr}
            source={require('../../../assets/images/productDetailHeader.png')}
          />
          <View style={styles.headView2}>
            <View
              style={{
                justifyContent: 'space-between',

                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
              onPress={() => navigation.goBack()}
              >
                <Image
                  style={{marginTop: 24, marginLeft: 20}}
                  source={require('../../../assets/images/icons/whiteBackArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  style={{marginTop: 24, marginRight: 20}}
                  source={require('../../../assets/images/icons/3dotsIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.productImageContainer}>
            <Image style={styles.productImage} source={{uri: product.image}} />
          </View>
          <View style={{position: 'relative', marginTop: 70}}>
            <Text style={styles.titleBoldText1}>{product.name}</Text>
            <Text style={styles.priceText}>
              {formatCurrency(product.price)}
            </Text>

            <Text style={styles.titleBoldText2}>About</Text>
            <Text style={styles.grayThinText}>{product.description}</Text>
            <View style={styles.menuView}>
              <Text style={styles.titleBoldText}>Popular Featured</Text>
              <TouchableOpacity onPress={handleToggleExpandSameDeal}>
                <Text style={styles.viewallText}>
                  {isExpanded ? 'Show Less' : 'View All'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
              <FlatList
                data={product.attributes.slice(0, 3)}
                keyExtractor={item => item._id.toString()}
                renderItem={renderTopping}
                showsVerticalScrollIndicator={true}
                horizontal={true}
              />
            </View>

            <ScrollView style={styles.scrollContainer}>
              <Animated.View style={[styles.expandedContainer, animatedStyle]}>
                <FlatList
                  data={product.attributes.slice(3)} // Show the remaining items
                  renderItem={renderTopping}
                  keyExtractor={item => item.id?.toString()}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                />
              </Animated.View>
            </ScrollView>
          </View>
        </ScrollView>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <View>{renderProductDetail()}</View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 50,
          backgroundColor: 'white',
          padding: 15,
        }}>
        <Text style={styles.addTD}>Do you want to add something?</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={async () => {
            addToCart();
          }}>
          <Text style={styles.addText}>Add to Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  spaceView: {
    height: 50,
  },
  addText: {
    fontFamily: 'nunitoSan',
    fontSize: 17,
    color: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  addBtn: {
    height: 40,
    width: 142,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 30,
    backgroundColor: '#F55F44',
  },
  addTD: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000 50%',
    marginLeft: 30,
    alignSelf: 'center',
  },
  optionDrinkBtn: {
    backgroundColor: '#CBCED1',
    opacity: 0.25,
    marginBottom: 15,
    borderRadius: 7,
    marginRight: 15,
  },
  optionDrinkView: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  expandedContainer: {
    overflow: 'hidden', // Ensures items don't overflow the container

    alignItems: 'center',
  },
  optionView: {
    width: '100%',
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBtn: {
    backgroundColor: '#CBCED1',
    opacity: 0.25,
    borderRadius: 7,
    marginRight: 15,
    width: 120,
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
  },
  optionFocusBtn: {
    backgroundColor: '#F55F44',
    opacity: 1,
  },
  grayNormalText: {
    fontFamily: 'nunitoSan',
    fontSize: 15,
    marginTop: 15,
    color: 'black',
    opacity: 0.5,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 130,
    width: 260,
  },
  nameIngre: {
    fontFamily: 'nunitoSan',
    fontSize: 11,
    textAlign: 'center',
    color: 'black',
    marginTop: 5,
  },
  priceIngre: {
    fontFamily: 'nunitoSan',
    fontSize: 11,
    textAlign: 'center',
    color: 'black',
  },
  ingredientImg: {
    width: 50,
    height: 50,
    borderRadius: 180,
    alignContent: 'center',
    alignSelf: 'center',
  },
  ingredientImgView: {
    width: 60,
    height: 60,
    marginTop: 10,
    borderRadius: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  ingredientView: {
    width: 102,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    margin: 10,
    alignItems: 'center',
  },
  ingredientsListView: {
    flex: 1,
  },

  ingredientTitleView: {},
  viewallText: {
    fontFamily: 'nunitoSan',
    fontSize: 11.5,

    color: '#F55F44',
  },
  titleBoldText2: {
    fontFamily: 'nunitoSan',
    fontSize: 12,
    marginLeft: 20,
    marginTop: 15,
    color: 'black',
  },
  titleBoldText: {
    fontFamily: 'nunitoSan',
    fontSize: 12,

    color: 'black',
  },
  titleBoldText1: {
    fontFamily: 'nunitoSan',
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  priceText: {
    fontSize: 24,
    marginLeft: 20,

    color: 'black',
    fontFamily: 'nunitoSan',
  },
  grayThinText: {
    fontFamily: 'nunitoSan',
    fontSize: 12,
    color: '#9D9D9D',
    textAlign: 'justify',
    lineHeight: 18,
    marginLeft: 20,

    fontWeight: 'Bold',
  },
  nameProduct: {
    fontFamily: 'nunitoSan',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  mainView: {
    width: '86%',
  },
  productImage: {
    width: 200,
    height: 170,
    justifyContent: 'center',
    top: 60,
    position: 'absolute',
    alignSelf: 'center',
  },
  productImageContainer: {
    width: 200,
    height: 170,

    alignSelf: 'center',
    justifyContent: 'center',
  },
  menuView: {
    width: '90%',
    height: 50,
    justifyContent: 'space-between',
    height: 20,

    flexDirection: 'row',
    marginTop: 20,
    position: 'relative',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F6FB',
    alignContent: 'center',
  },
  productContainer: {
    backgroundColor: '#F7F6FB',
  },

  headView: {},
  headView2: {
    justifyContent: 'space-between',
    marginTop: 20,
  },
  redFoodBgr: {
    width: 500,
    height: 500,
    borderRadius: 250, // Half of width/height to make it a perfect circle
    backgroundColor: '#F55F44', // Example color for the background
    position: 'absolute',
    overflow: 'hidden',

    alignSelf: 'center',
    top: -260, // Offset the top to make it appear in the center of the screen
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#F7F6FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
