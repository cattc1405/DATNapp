import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getBrands, submitOrder, removeUserCartItem } from '../../apiClient';
import { useDispatch, useSelector } from 'react-redux';

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';
import colors from '../../../assets/colors';
import CustomAlert from '../../CustomAlert';


const AddressScreen = ({ navigation }) => {
  const [showBrands, setShowBrands] = useState(false);
  const animationValue = useSharedValue(0);
  const [brands, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand
  const router = useRoute();
  const selectedContact = router.params;
  const token = useSelector(state => state.auth.user?.token);
  const userId = useSelector(state => state.auth.user?.userId);
  const [showImage, setShowImage] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const restaurant2 = selectedBrand;
  const contact = selectedContact.selectedContact;
  console.log('res1', restaurant2);
  //
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrand(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  }, []);

  const toggleShowImage = () => {
    setShowImage(prev => !prev);
  };
  const handleOk = () => {
    setIsAlertVisible(false);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => {
        toggleShowImage();
        setSelectedBrand(item);
        setShowBrands(false);
      }}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Image source={{ uri: item.image }} style={styles.logo} />
        <View style={styles.infoContainer}>
          <Text
            style={styles.restaurantName}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.name}
          </Text>
          <View>
            <Text
              style={styles.restaurantAddress}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item.address}
            </Text>
          </View>
        </View>
        <View style={styles.offerBadge}>
          <Text style={styles.offerText}>{item.offers}</Text>
        </View>
      </View>
      <View style={styles.lineItem}></View>
    </TouchableOpacity>
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(showBrands ? 300 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      overflow: 'hidden',
    };
  });

  const toggleBrands = () => {
    toggleShowImage();
    setShowBrands(prev => !prev);
    animationValue.value = showBrands ? 0 : 1;
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        // onCancel={handleCancel}
        onOk={handleOk}
      />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backArrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 2/3</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../../assets/images/closeArrow.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>

      </View>

      {/* Image */}
      {showImage && (
        <Image
          source={require('../../../assets/images/backroundHome.png')}
          style={styles.buildingImage}
        />
      )}

      {/* Text */}
      <Text style={styles.questionText}>
        Bạn muốn nhận đơn hàng tại địa chỉ nào?
      </Text>
      <Text style={styles.subText}>
        Chọn địa chỉ nhận hàng cho đơn hàng của bạn.
      </Text>

      {/* Address Box */}
      <View style={styles.addressBox}>
        <Text style={styles.addressHeader}>CHỌN ĐỊA CHỈ CỦA BẠN</Text>
        {selectedBrand ? ( //Kiểm tra nếu đã chọn thương hiệu
          <View style={styles.addressContent}>
            <Text style={styles.addressTitle}>{selectedBrand.name}</Text>
            <TouchableOpacity onPress={() => setSelectedBrand(null)}>
              {/* Optional: to clear selection */}
              <Image
                source={require('../../../assets/images/redcircle.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.addressTitle}>Chọn một thương hiệu</Text> // Placeholder if no brand is selected
        )}
        {selectedBrand && ( // Only show address details if a brand is selected
          <>
            <Text style={styles.addressDetails}>{selectedBrand.address}</Text>
          </>
        )}

        {/* Change Address Button */}
        <TouchableOpacity
          style={styles.changeAddressButton}
          onPress={toggleBrands}>
          <Text style={styles.changeAddressButtonText}>Thay đổi địa chỉ</Text>
        </TouchableOpacity>

        {/* Animated Brand Options */}
        <Animated.View style={[styles.brandOptionsContainer, animatedStyle]}>
          <FlatList
            style={styles.flatlistAddress}
            data={brands}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.scrollContainer} // giống ScrollView của bạn
          />
        </Animated.View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (!selectedBrand) {
            setAlertMessage('Vui lòng chọn một địa chỉ!');
            setAlertTitle('Thiếu thông tin!');
            setIsAlertVisible(true);
            return;
          }
          const brand = selectedBrand._id;
          console.log(brand, contact);
          navigation.navigate('Checkout4', { brand, contact });
        }}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistAddress: {
    marginTop: 5
  },
  infoContainer: {
    width: '90%',
    justifyContent: 'center',
    marginRight: 20,
  },
  lineItem: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  restaurantCard: {
    width: '100%',

    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'nunitoSan',
    textAlign: 'center',
    marginLeft: 10,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    // fontFamily: 'nunitoSan',
    marginLeft: 10,
    // marginRight:30,
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'nunitoSan',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  buildingImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'nunitoSan',
    color: '#000000',
  },
  subText: {
    fontSize: 15,
    color: '#989DA3',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600',
  },
  addressBox: {
    width: '100%',
    backgroundColor: colors.whiteBgr,
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  addressHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  addressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    // fontFamily: 'nunitoSan',
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginTop: 0,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    // fontFamily: 'nunitoSan',
  },
  changeAddressButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  changeAddressButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'nunitoSan',
  },
  brandOptionsContainer: {
    // Initial styles for the animated container
    overflow: 'hidden', // Prevents overflow during animation
  },
  brandOption: {
    fontSize: 14,
    paddingVertical: 5,
    fontFamily: 'nunitoSan',
  },
  nextButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'nunitoSan',
  },
});

export default AddressScreen;
