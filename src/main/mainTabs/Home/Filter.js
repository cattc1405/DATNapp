import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Filter = () => {
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState('Eat in');
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [selectedDistance, setSelectedDistance] = useState('1-3km');

  const toggleDistance = distance => {
    setSelectedDistance(distance);
  };

  const isDistanceSelected = distance => selectedDistance === distance;
  const handleSelectType = type => {
    setSelectedType(type);
  };
  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const isCategorySelected = category => {
    return selectedCategories.includes(category);
  };

  const clearAllCategories = () => {
    setSelectedCategories(['All']);
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
          <Text style={styles.grayBoldText}>Type</Text>
          <TouchableOpacity>
            <Text style={styles.grayThinText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === 'Eat in' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType('Eat in')}>
            <Text
              style={[
                styles.optionText,
                selectedType === 'Eat in' && styles.optionFocusText,
              ]}>
              Eat in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === 'Delivery' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType('Delivery')}>
            <Text
              style={[
                styles.optionText,
                selectedType === 'Delivery' && styles.optionFocusText,
              ]}>
              Delivery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionBtn,
              selectedType === 'Pick-Up' && styles.optionFocusBtn,
            ]}
            onPress={() => handleSelectType('Pick-Up')}>
            <Text
              style={[
                styles.optionText,
                selectedType === 'Pick-Up' && styles.optionFocusText,
              ]}>
              Pick-Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.clearView}>
          <Text style={styles.grayBoldText}>Categories</Text>
          <TouchableOpacity>
            <Text
              style={styles.grayThinText}
              onPress={() => clearAllCategories()}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionCateView}>
          <View style={styles.optionGroup4View}>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('All') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('All')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('All') && styles.optionFocusText,
                ]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Fast Food') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Fast Food')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Fast Food') && styles.optionFocusText,
                ]}>
                Fast Food
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Pizza') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Pizza')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Pizza') && styles.optionFocusText,
                ]}>
                Pizza
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Sushi') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Sushi')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Sushi') && styles.optionFocusText,
                ]}>
                Sushi
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionGroup4View}>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Coffee') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Coffee')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Coffee') && styles.optionFocusText,
                ]}>
                Coffee
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Desserts') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Desserts')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Desserts') && styles.optionFocusText,
                ]}>
                Desserts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Breakfast') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Breakfast')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Breakfast') && styles.optionFocusText,
                ]}>
                Breakfast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Soup') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Soup')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Soup') && styles.optionFocusText,
                ]}>
                Soup
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionGroup4View}>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Vegan') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Vegan')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Vegan') && styles.optionFocusText,
                ]}>
                Vegan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Burgurs') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Burgurs')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Burgurs') && styles.optionFocusText,
                ]}>
                Burgurs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Dinner') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Dinner')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Dinner') && styles.optionFocusText,
                ]}>
                Dinner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isCategorySelected('Healthy') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleCategory('Healthy')}>
              <Text
                style={[
                  styles.optionText,
                  isCategorySelected('Healthy') && styles.optionFocusText,
                ]}>
                Healthy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.clearView, styles.mginT]}>
          <Text style={styles.grayBoldText}>Distance From Your Location</Text>
          <TouchableOpacity>
            <Text style={styles.grayThinText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Distance */}
        <View style={styles.optionCateView}>
          <View style={styles.optionGroup4View}>
            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isDistanceSelected('1-3km') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleDistance('1-3km')}>
              <Text
                style={[
                  styles.optionText,
                  isDistanceSelected('1-3km') && styles.optionFocusText,
                ]}>
                1-3km
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isDistanceSelected('3-6km') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleDistance('3-6km')}>
              <Text
                style={[
                  styles.optionText,
                  isDistanceSelected('3-6km') && styles.optionFocusText,
                ]}>
                3-6km
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isDistanceSelected('6-9km') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleDistance('6-9km')}>
              <Text
                style={[
                  styles.optionText,
                  isDistanceSelected('6-9km') && styles.optionFocusText,
                ]}>
                6-9km
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCateBtn,
                isDistanceSelected('>10km') && styles.optionFocusBtn,
              ]}
              onPress={() => toggleDistance('>10km')}>
              <Text
                style={[
                  styles.optionText,
                  isDistanceSelected('>10km') && styles.optionFocusText,
                ]}>
                &gt;10km
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.applyBtn}>
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
});
