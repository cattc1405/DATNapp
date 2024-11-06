import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getCategories} from '../../../apiClient';

const Filter = () => {
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState('1-3km');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = categoryId => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const isCategorySelected = categoryId => {
    return selectedCategories.includes(categoryId);
  };

  const renderCategoryItem = ({item}) => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.optionCateBtn,
          isCategorySelected(item._id) && styles.optionFocusBtn, // Use item._id
        ]}
        onPress={() => toggleCategory(item._id)}>
        <Text
          style={[
            styles.optionText,
            isCategorySelected(item._id) && styles.optionFocusText, // Check with item._id
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleApplyFilters = () => {
    // Navigate back to the previous screen with selected category IDs
    navigation.navigate('Product', {
      selectedCategories: selectedCategories, // This should be an array of category IDs
    });
  };

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
              style={styles.iconMenuView}
              source={require('../../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.ResetView}>
          <Text style={styles.titleBoldText}>Filter</Text>
          <TouchableOpacity>
            <Text style={styles.titleThinText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainView}>
        <View style={styles.clearView}>
          <Text style={styles.grayBoldText}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.grayThinText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={
            item => (item.id ? item.id.toString() : item.name) // Ensure unique key
          }
          numColumns={3}
        />

        <View style={[styles.clearView, styles.mginT]}>
          <Text style={styles.grayBoldText}>Distance From Your Location</Text>
          <TouchableOpacity>
            <Text style={styles.grayThinText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.applyBtn} onPress={handleApplyFilters}>
          <Text style={styles.applyText}>Apply filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
  },
  applyText: {
    fontSize: 18,
    fontFamily: 'nunitoSan',
    color: '#fff',
    fontWeight: 'bold',
  },
  applyBtn: {
    position: 'absolute',
    bottom: 205,
    width: '70%',
    marginLeft: '15%',
    backgroundColor: '#F55F44',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  mginT: {
    marginTop: -18,
  },
  optionFocusBtn: {
    backgroundColor: '#F55F44',
    opacity: 1,
  },
  optionCateBtn: {
    backgroundColor: '#CBCED1',
    opacity: 0.25,
    borderRadius: 7,
  },
  optionGroup4View: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 18,
  },
  optionCateView: {
    width: '90%',
    marginLeft: '5%',
    display: 'flex',
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
  optionView: {
    width: '90%',
    marginLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayThinText: {
    fontSize: 12,
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  grayBoldText: {
    fontSize: 17,
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    fontWeight: '700',
  },
  titleThinText: {
    fontSize: 15,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: '700',
  },
  ResetView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLogo: {
    width: 200,
    height: 50,
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
    height: '23%',
    backgroundColor: 'blue',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonContainer: {
    margin: 5,

    alignItems: 'center',
  },
});
