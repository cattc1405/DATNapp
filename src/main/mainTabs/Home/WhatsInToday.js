import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getFeaturedProduct, getProductSameDeal} from '../../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import colors from '../../../../assets/colors';

const WhatsInToday = () => {
  const navigation = useNavigation();
  const [productF, setProductF] = useState([]);
  const [productSD, setProductSD] = useState([]);
  const [isExpandedF, setIsExpandedF] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const featuredAnimationHeight = useSharedValue(0);
  const dealAnimationHeight = useSharedValue(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [featuredData, sameDealData] = await Promise.all([
        getFeaturedProduct(),
        getProductSameDeal(),
      ]);
      setProductF(sameDealData);
      setProductSD(sameDealData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleToggleExpandFeatured = () => {
    console.log(productF);
    setIsExpandedF(prev => !prev);
    if (!isExpandedF) {
      featuredAnimationHeight.value = productSD.slice(3).length * 70;
      if (isExpanded) {
        setIsExpanded(false);
        dealAnimationHeight.value = 0;
      }
    } else {
      featuredAnimationHeight.value = 0;
    }
  };

  const handleToggleExpandSameDeal = () => {
    setIsExpanded(prev => !prev);
    if (!isExpanded) {
      dealAnimationHeight.value = productSD.slice(3).length * 70;
      if (isExpandedF) {
        setIsExpandedF(false);
        featuredAnimationHeight.value = 0;
      }
    } else {
      dealAnimationHeight.value = 0;
    }
  };

  const featuredAnimatedStyle = useAnimatedStyle(() => ({
    height: withTiming(featuredAnimationHeight.value, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }),
    // overflow: 'hidden',
  }));

  const dealAnimatedStyle = useAnimatedStyle(() => ({
    height: withTiming(dealAnimationHeight.value, {
      duration: 500,
    }),
  }));

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductStack', {
          screen: 'ProductDetail',
          params: {productId: item._id},
        })
      }>
      <View style={styles.productsContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>
          {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headView}>
        <ImageBackground
          style={styles.redFoodBgr}
          source={require('../../../../assets/images/redFoodBgr.png')}
        />
        <View style={styles.headSpaceView}>
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
        <Text style={styles.titleBoldText}>Hôm nay có gì?</Text>
      </View>
      {/* Popular Featured Section */}

      <ScrollView style={styles.bodyView}>
        <View style={styles.menuView}>
          <Text style={styles.titleBoldText1}>Sản phẩm đề xuất</Text>
          <TouchableOpacity onPress={handleToggleExpandFeatured}>
            <Text style={styles.viewallText}>
              {isExpandedF ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <FlatList
            data={productF.slice(0, 3)}
            renderItem={renderProductItem}
            keyExtractor={item => item.id?.toString()}
            numColumns={3}
          />
        </View>
        <Animated.View
          style={[styles.expandedContainer, featuredAnimatedStyle]}>
          {productF.slice(3, 15).length > 0 && (
            <FlatList
              data={productF.slice(3, 15)} // Display only products from 4 to 15
              renderItem={renderProductItem}
              keyExtractor={item => item.id?.toString()}
              numColumns={3}
            />
          )}
        </Animated.View>

        {/* 30k Deal Section */}
        <View style={styles.menuView}>
          <Text style={styles.titleBoldText1}>Đồng giá 30k</Text>
          <TouchableOpacity onPress={handleToggleExpandSameDeal}>
            <Text style={styles.viewallText}>
              {isExpanded ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <FlatList
            data={productSD.slice(0, 3)}
            renderItem={renderProductItem}
            keyExtractor={item => item.id?.toString()}
            numColumns={3}
          />
        </View>
        <Animated.View style={[styles.expandedContainer, dealAnimatedStyle]}>
          <FlatList
            data={productSD.slice(3)}
            renderItem={renderProductItem}
            keyExtractor={item => item.id?.toString()}
            numColumns={3}
          />
        </Animated.View>
        {/* <View style={styles.menuView}> */}

        <View style={( !isExpanded && !isExpandedF) ? styles.allPviewAbsolute:styles.allPView}>
          <TouchableOpacity
            style={styles.viewAllProduct}
            onPress={() =>
              navigation.navigate('ProductStack', {screen: 'Product'})
            }>
            <Text style={styles.viewallPText}>
              Xem tất cả sản phẩm của chúng tôi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={ isExpanded || isExpandedF?  styles.allPviewAbsolute:styles.allPView}>
        <TouchableOpacity
          style={styles.viewAllProduct}
          onPress={() =>
            navigation.navigate('ProductStack', {screen: 'Product'})
          }>
          <Text style={styles.viewallPText}>
            Xem tất cả sản phẩm của chúng tôi
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      {/* Footer Section */}
    </View>
  );
};

export default WhatsInToday;

const styles = StyleSheet.create({
  bodyView: {
    width: '100%',
    height: '100%',
  },
  allPviewAbsolute: {
    width: '100%',
    position: 'absolute',
display:'none'  },
  allPView: {
    width: '100%',
    position: 'relative',
    display:'flex'
  },
  viewallPText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 16,
  },
  viewAllProduct: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '86%',
    marginLeft: '7%',
    borderRadius: 20,
    backgroundColor: colors.orange1,
    height: 50,
  },

  productDescription: {
    fontWeight: '200',
    fontSize: 9,
    fontFamily: 'nunitoSan',
    color: '#9D9D9D',
  },
  productPrice: {
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'nunitoSan',
    color: '#000000',
  },
  expandedContainer: {
    overflow: 'hidden',
  },

  productsContainer: {
    width: 100,
    height: 140,
    borderRadius: 20,
    elevation: 4,
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
    marginTop: 120,
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
    resizeMode: 'contain',

    marginLeft: '5%',
    marginTop: 50,
  },
  headSpaceView: {
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuView: {
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    // backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.whiteBgr,
  },
  headView: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  }, //animated filter
});
