import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getBrands} from '../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';
const AddressScreen = ({navigation}) => {
  const [showBrands, setShowBrands] = useState(false);
  const animationValue = useSharedValue(0);
  const [brands, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand
  const router = useRoute();
  const selectedContact = router.params;
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => {
        setSelectedBrand(item); // Set the selected brand
        setShowBrands(false); // Close the brands list after selection
      }}>
      <Image source={{uri: item.image}} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantAddress}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.reviewText}>({item.review})</Text>
        </View>
      </View>
      <View style={styles.offerBadge}>
        <Text style={styles.offerText}>{item.offers}</Text>
      </View>
    </TouchableOpacity>
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(showBrands ? 200 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      overflow: 'hidden',
    };
  });

  const toggleBrands = () => {
    setShowBrands(prev => !prev);
    animationValue.value = showBrands ? 0 : 1;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backArrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 2/4</Text>
        <Image
          source={require('../../../assets/images/closeArrow.png')}
          style={styles.closeIcon}
        />
      </View>

      {/* Image */}
      <Image
        source={require('../../../assets/images/backroundHome.png')}
        style={styles.buildingImage}
      />

      {/* Text */}
      <Text style={styles.questionText}>
        Which Address Do You Want to Receive Your Order?
      </Text>
      <Text style={styles.subText}>
        Choose the address where you want your order to be delivered.
      </Text>

      {/* Address Box */}
      <View style={styles.addressBox}>
        <Text style={styles.addressHeader}>CHOOSE YOUR ADDRESS</Text>
        {selectedBrand ? ( // Check if a brand is selected
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
          <Text style={styles.addressTitle}>Select a brand</Text> // Placeholder if no brand is selected
        )}
        {selectedBrand && ( // Only show address details if a brand is selected
          <>
            <Text style={styles.addressDetails}>{selectedBrand.address}</Text>
            <Text style={styles.addressDetails}>
              Zip Code - {selectedBrand.zipCode || 'Not available'}
            </Text>
          </>
        )}

        {/* Change Address Button */}
        <TouchableOpacity
          style={styles.changeAddressButton}
          onPress={toggleBrands}>
          <Text style={styles.changeAddressButtonText}>Change Address</Text>
        </TouchableOpacity>

        {/* Animated Brand Options */}
        <Animated.View style={[styles.brandOptionsContainer, animatedStyle]}>
          <Text>aa</Text>
          <FlatList
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
            alert('Please select a brand');
            return; // Prevent proceeding if no brand is selected
          }
          navigation.navigate('Checkout3', {selectedBrand, selectedContact});
        }}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'nunitoSan',
  },
  addressBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    marginTop: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  addressHeader: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  addressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginTop: -40,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'nunitoSan',
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
