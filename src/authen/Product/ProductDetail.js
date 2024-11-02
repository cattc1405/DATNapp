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

const ProductDetail = ({route}) => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState();
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const userId = useSelector(state => state.auth.user?.userId);

  const {productId} = route.params; // Retrieve the productId from route parameters
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState();
  const [localUserId, setLocalUserId] = useState(null);
  const token = useSelector(state => state.auth.user?.token); // Retrieve the token at the top level

  // Send to cartUser
  const [itemOrder, setItemOrder] = useState([]);
  const addToCart = async () => {
    try {
      const newItem = {
        id: Math.random().toString(),
        drink: selectedDrink,
        excluded: selectedItems,
        image: product.image,
        name: product.name,
        price: price,
        quantity: 1,
        size: size,
        userId: userId, // Use the current user's ID
      };

      setItemOrder(prevItems =>
        Array.isArray(prevItems) ? [...prevItems, newItem] : [newItem],
      );

      setTimeout(() => {
        navigation.navigate('CartStack', {screen: 'OrderDetail'});
      }, 500);
    } catch (error) {
      console.error('Error in addToCart:', error);
    }
  };

  // Effect to add items to the cart when itemOrder changes
  useEffect(() => {
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
  }, [itemOrder, userId, token]);

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

  const handleSelectType = (type, price, name) => {
    setSelectedType(type);
    setPrice(price);
    setSize(name);
  };

  const handleSelectDrink = drink => {
    setSelectedDrink(drink);
  };
  const handleSelectItem = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
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

  const renderProductDetail = () => {
    if (product) {
      return (
        <ScrollView style={styles.productContainer}>
          <Image style={styles.productImage} source={{uri: product.image}} />
          <Text style={styles.titleBoldText}>{product._id}</Text>
          <Text style={styles.grayThinText}>{product.description}</Text>
          <View style={styles.ingredientsListView}>
            <View style={styles.ingredientView}>
              <Image
                style={styles.ingredientImg}
                source={require('../../../assets/images/BigMacBun.png')}
              />
              <Text style={styles.nameIngre}>Big Mac Bun</Text>
            </View>
            <View style={styles.ingredientView}>
              <Image
                style={styles.ingredientImg}
                source={require('../../../assets/images/BigMacBun.png')}
              />
              <Text style={styles.nameIngre}>Beef Patty</Text>
            </View>
            <View style={styles.ingredientView}>
              <Image
                style={styles.ingredientImg}
                source={require('../../../assets/images/BigMacBun.png')}
              />
              <Text style={styles.nameIngre}>Lettuce</Text>
            </View>
          </View>
          <Text style={styles.grayNormalText}>How big?</Text>
          <View style={styles.attributeContainer}>
            {product.attributes
              .filter(item => item.isActive)
              .map(item => (
                <TouchableOpacity
                  key={item._id}
                  style={[
                    styles.optionBtn,
                    selectedType === item._id && styles.optionFocusBtn,
                  ]}
                  onPress={() =>
                    handleSelectType(item._id, item.price, item.size)
                  }>
                  <Text
                    style={[
                      styles.optionText,
                      selectedType === item._id && styles.optionFocusText,
                    ]}>
                    {item.size} - ${item.price}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          <Text style={styles.grayNormalText}>What do you want to drink?</Text>
          <View style={styles.optionDrinkView}>
            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Water' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Water')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Water' && styles.optionFocusText,
                ]}>
                Water
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Lemonade' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Lemonade')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Lemonade' && styles.optionFocusText,
                ]}>
                Lemonade
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Fanta' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Fanta')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Fanta' && styles.optionFocusText,
                ]}>
                Fanta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Iced Tea' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Iced Tea')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Iced Tea' && styles.optionFocusText,
                ]}>
                Iced Tea
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Pepsi' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Pepsi')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Pepsi' && styles.optionFocusText,
                ]}>
                Pepsi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Dr.Pepper' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Dr.Pepper')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Dr.Pepper' && styles.optionFocusText,
                ]}>
                Dr.Pepper
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedDrink === 'Sprite' && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectDrink('Sprite')}>
              <Text
                style={[
                  styles.optionText,
                  selectedDrink === 'Sprite' && styles.optionFocusText,
                ]}>
                Sprite
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.grayNormalText}>
            Do you want to take something out?
          </Text>
          <View style={styles.optionDrinkView}>
            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedItems.includes('Lettuce') && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectItem('Lettuce')}>
              <Text
                style={[
                  styles.optionText,
                  selectedItems.includes('Lettuce') && styles.optionFocusText,
                ]}>
                Lettuce
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedItems.includes('Big Mac Sauce') &&
                  styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectItem('Big Mac Sauce')}>
              <Text
                style={[
                  styles.optionText,
                  selectedItems.includes('Big Mac Sauce') &&
                    styles.optionFocusText,
                ]}>
                Big Mac Sauce
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedItems.includes('Cheese') && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectItem('Cheese')}>
              <Text
                style={[
                  styles.optionText,
                  selectedItems.includes('Cheese') && styles.optionFocusText,
                ]}>
                Cheese
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedItems.includes('Pickles') && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectItem('Pickles')}>
              <Text
                style={[
                  styles.optionText,
                  selectedItems.includes('Pickles') && styles.optionFocusText,
                ]}>
                Pickles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionDrinkBtn,
                selectedItems.includes('Onion') && styles.optionFocusBtn,
              ]}
              onPress={() => handleSelectItem('Onion')}>
              <Text
                style={[
                  styles.optionText,
                  selectedItems.includes('Onion') && styles.optionFocusText,
                ]}>
                Onion
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceView} />

          <TouchableOpacity
            style={styles.addBtn}
            onPress={async () => {
              const itemOrder = {
                productId: product._id,
                attributeId: selectedType,
                drink: selectedDrink,
                excluded: selectedItems,
                quantity: 1,
                image: product.image,
                price: price,
                size: size,
                name: product.name,
                userId: localUserId,
              };
              setItemOrder(itemOrder);
              addToCart();
            }}>
            <Text style={styles.addText}>Add to Order</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <ImageBackground
          style={styles.redFoodBgr}
          source={require('../../../assets/images/redFoodBgr.png')}
        />
        <View style={styles.menuView}>
          <View
            style={{
              justifyContent: 'space-between',

              display: 'flex',
              flexDirection: 'row',

              position: 'relative',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/icons/whiteBackArrow.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/icons/3dotsIcon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {renderProductDetail()}
      </View>

      {/* <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
        {/* {renderProductDetail()} */}
      {/* <View style={styles.ingredientTitleView}>
          <Text style={styles.titleBoldText}>INGREDIENTS INCLUDED</Text>
          <Text style={styles.viewallText}>View all</Text>
        </View>
        <View style={styles.ingredientsListView}>
          <View style={styles.ingredientView}>
            <Image
              style={styles.ingredientImg}
              source={require('../../../assets/images/BigMacBun.png')}
            />
            <Text style={styles.nameIngre}>Big Mac Bun</Text>
          </View>
          <View style={styles.ingredientView}>
            <Image
              style={styles.ingredientImg}
              source={require('../../../assets/images/BigMacBun.png')}
            />
            <Text style={styles.nameIngre}>Beef Patty</Text>
          </View>
          <View style={styles.ingredientView}>
            <Image
              style={styles.ingredientImg}
              source={require('../../../assets/images/BigMacBun.png')}
            />
            <Text style={styles.nameIngre}>Lettuce</Text>
          </View>
        </View>
        <Text style={styles.titleBoldText}>CUSTOMIZATIONS</Text>
        <Text style={styles.grayNormalText}>
          What is the size of your burguer?
        </Text>

        <View style={styles.optionView}>
          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === 'Small' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType('Small')}>
            <Text
              style={[
                styles.optionText,
                selectedType === 'Small' && styles.optionFocusText,
              ]}>
              Small
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === 'Medium' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType('Medium')}>
            <Text
              style={[
                styles.optionText,
                selectedType === 'Medium' && styles.optionFocusText,
              ]}>
              Medium
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === 'Big' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType('Big')}>
            <Text
              style={[
                styles.optionText,
                selectedType === 'Big' && styles.optionFocusText,
              ]}>
              Big
            </Text>
          </TouchableOpacity>
        </View> */}
      {/* drink */}
      {/* <Text style={styles.grayNormalText}>What do you want to drink?</Text>
        <View style={styles.optionDrinkView}>
          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Water' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Water')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Water' && styles.optionFocusText,
              ]}>
              Water
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Lemonade' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Lemonade')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Lemonade' && styles.optionFocusText,
              ]}>
              Lemonade
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Fanta' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Fanta')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Fanta' && styles.optionFocusText,
              ]}>
              Fanta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Iced Tea' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Iced Tea')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Iced Tea' && styles.optionFocusText,
              ]}>
              Iced Tea
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Pepsi' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Pepsi')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Pepsi' && styles.optionFocusText,
              ]}>
              Pepsi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Dr.Pepper' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Dr.Pepper')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Dr.Pepper' && styles.optionFocusText,
              ]}>
              Dr.Pepper
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedDrink === 'Sprite' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectDrink('Sprite')}>
            <Text
              style={[
                styles.optionText,
                selectedDrink === 'Sprite' && styles.optionFocusText,
              ]}>
              Sprite
            </Text>
          </TouchableOpacity>
        </View> */}

      {/* sth out */}
      {/* <Text style={styles.grayNormalText}>
          Do you want to take something out?
        </Text>
        <View style={styles.optionDrinkView}>
          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedItems.includes('Lettuce') && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectItem('Lettuce')}>
            <Text
              style={[
                styles.optionText,
                selectedItems.includes('Lettuce') && styles.optionFocusText,
              ]}>
              Lettuce
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedItems.includes('Big Mac Sauce') && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectItem('Big Mac Sauce')}>
            <Text
              style={[
                styles.optionText,
                selectedItems.includes('Big Mac Sauce') &&
                  styles.optionFocusText,
              ]}>
              Big Mac Sauce
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedItems.includes('Cheese') && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectItem('Cheese')}>
            <Text
              style={[
                styles.optionText,
                selectedItems.includes('Cheese') && styles.optionFocusText,
              ]}>
              Cheese
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedItems.includes('Pickles') && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectItem('Pickles')}>
            <Text
              style={[
                styles.optionText,
                selectedItems.includes('Pickles') && styles.optionFocusText,
              ]}>
              Pickles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionDrinkBtn,
              selectedItems.includes('Onion') && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectItem('Onion')}>
            <Text
              style={[
                styles.optionText,
                selectedItems.includes('Onion') && styles.optionFocusText,
              ]}>
              Onion
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spaceView} /> */}
      {/* </ScrollView> */}
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
    height: 45,
    width: '100%',
    position: 'relative',
    bottom: 5,

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#F55F44',
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
  },
  nameIngre: {
    fontFamily: 'nunitoSan',
    fontSize: 13,
    textAlign: 'center',
    color: 'black',
    marginTop: 5,
    fontWeight: 'bold',
  },
  ingredientImg: {
    width: '100%',
    height: 60,
    marginTop: 10,
    resizeMode: 'contain',
  },
  ingredientView: {
    width: '30.5%',
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 2,
  },
  ingredientsListView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewallText: {
    fontFamily: 'nunitoSan',
    fontSize: 13,
    marginTop: 25,
    marginBottom: 12,
    color: '#F55F44',
    fontWeight: 'bold',
  },
  ingredientTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBoldText: {
    fontFamily: 'nunitoSan',
    fontSize: 25,
    marginTop: 25,
    marginBottom: 12,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  grayThinText: {
    fontFamily: 'nunitoSan',
    fontSize: 17,
    color: '#9D9D9D',
    textAlign: 'justify',
    lineHeight: 18,
    marginLeft: 10,
    fontWeight: '700',
  },
  nameProduct: {
    fontFamily: 'nunitoSan',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  mainView: {
    width: '86%',
    marginLeft: '7%',
  },
  productImage: {
    width: 100,
    height: 150,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuView: {
    width: '90%',
    height: 150,
    justifyContent: 'space-between',
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '18%',
    position: 'relative',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  productContainer: {
    width: '100%',
    height: '100%',

    backgroundColor: 'white',
  },
  headView: {
    flex: 1,
    alignItems: 'center',
  },
  redFoodBgr: {
    width: 500,
    height: 500,
    borderRadius: 500,
    position: 'absolute',
    top: -250,
  },
  attributeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
