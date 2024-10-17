import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Product = () => {

    const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState();
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectType = type => {
    setSelectedType(type);
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
  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image
          style={styles.redFoodBgr}
          source={require('../../../../assets/images/redFoodBgr.png')}
        />
        <Image
          style={styles.producImage}
          source={require('../../../../assets/images/BigMacBigImage.png')}
        />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
            <Image
              source={require('../../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/icons/3dotsIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
        <Text style={styles.nameProduct}>Big Mac Menu</Text>
        <Text style={styles.grayThinText}>For each menu you get 15 points</Text>
        <Text style={styles.titleBoldText}>About</Text>
        <Text style={styles.grayThinText}>
          Mouthwatering perfection starts with two 100% pure beef patties and
          Big Mac® sauce sandwiched between a sesame seed bun. It's topped off
          with pickles, crisp lettuce, onions and American cheese for a 100%
          beef burger with a taste like no other.
        </Text>
        <View style={styles.ingredientTitleView}>
          <Text style={styles.titleBoldText}>INGREDIENTS INCLUDED</Text>
          <Text style={styles.viewallText}>View all</Text>
        </View>
        <View style={styles.ingredientsListView}>
          <View style={styles.ingredientView}>
            <Image
              style={styles.ingredientImg}
              source={require('../../../../assets/images/BigMacBun.png')}
            />
            <Text style={styles.nameIngre}>Big Mac Bun</Text>
          </View>
          <View style={styles.ingredientView}>
            <Image
              style={styles.ingredientImg}
              source={require('../../../../assets/images/BeefPatty.png')}
            />
            <Text style={styles.nameIngre}>Beef Patty</Text>
          </View>
          <View style={styles.ingredientView}>
            <Image
              style={styles.ingredientImg}
              source={require('../../../../assets/images/Lettuce.png')}
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
        </View>
        {/* drink */}
        <Text style={styles.grayNormalText}>
          What is the size of your burguer?
        </Text>
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

        {/* sth out */}
        <Text style={styles.grayNormalText}>
          What is the size of your burguer?
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
        <View style={styles.spaceView} />
      </ScrollView>
      <TouchableOpacity style={styles.addBtn}  onPress={()=>navigation.navigate('OrderDetail')}>
        <Text style={styles.addText}>Add to Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

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
    width: '50%',
    position: 'absolute',
    bottom: 5,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 15,
    marginTop: 25,
    marginBottom: 12,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  grayThinText: {
    fontFamily: 'nunitoSan',
    fontSize: 13,
    color: '#9D9D9D',
    textAlign: 'justify',
    lineHeight: 18,
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
  producImage: {
    width: '70%',
    height: 240,
    position: 'absolute',
    bottom: 0,
    resizeMode: 'contain',
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
    height: '37%',
    alignItems: 'center',
  },
  redFoodBgr: {
    width: 500,
    height: 500,
    borderRadius: 500,
    position: 'absolute',
    top: -250,
  },
});
