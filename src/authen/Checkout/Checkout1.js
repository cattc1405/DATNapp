import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {getUserInfo} from '../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const OrderScreen = ({navigation}) => {
  const [showContacts, setShowContacts] = useState(false);
  const animationValue = useSharedValue(0);
  const [user, setUser] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo(userId, token);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId && token) fetchUser();
  }, [userId, token]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={() => {
        setSelectedContact(item);
        setShowContacts(false);
      }}>
      <Text style={styles.contactName}>{item}</Text>
    </TouchableOpacity>
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(showContacts ? 200 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }),
    overflow: 'hidden',
  }));

  const toggleContacts = () => {
    setShowContacts(prev => !prev);
    animationValue.value = showContacts ? 0 : 1;
  };
  console.log(selectedContact);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.stepText}>Step 1/4</Text>
        <Image
          source={require('../../../assets/images/closeArrow.png')}
          style={styles.closeIcon}
        />
      </View>
      <Image
        source={require('../../../assets/images/hamburger.png')}
        style={styles.hamburger}
      />
      <Text style={styles.questionText}>
        How Do You Want To Receive Your Order?
      </Text>
      <Text style={styles.subText}>
        Choose one of the following methods to contact you.
      </Text>

      <View style={styles.contactBox}>
        <Text style={styles.contactHeader}>CHOOSE YOUR CONTACT</Text>
        {selectedContact ? (
          <View style={styles.contactContent}>
            <Text style={styles.contactTitle}>{selectedContact}</Text>
            <TouchableOpacity onPress={() => setSelectedContact(null)}>
              <Image
                source={require('../../../assets/images/redcircle.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.contactTitle}>Select a contact</Text>
        )}

        <TouchableOpacity
          style={styles.changeContactButton}
          onPress={toggleContacts}>
          <Text style={styles.changeContactButtonText}>Change Contact</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.contactOptionsContainer, animatedStyle]}>
          <FlatList
            data={user.contact} // Change to user.contact
            keyExtractor={(item, index) => index.toString()} // Use index for key extractor
            renderItem={renderItem}
            contentContainerStyle={styles.scrollContainer}
          />
        </Animated.View>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('AddressScreen', {selectedContact})}>
        <Text style={styles.nextButtonText}>Bước Tiếp Theo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  closeIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: 0,
  },
  hamburger: {
    marginTop: 20,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'nunitoSan',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'nunitoSan',
  },
  contactBox: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  contactHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: 'nunitoSan',
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  changeContactButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  changeContactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'nunitoSan',
  },
  contactOptionsContainer: {
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  nextButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
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
  deleteIcon: {
    width: 20,
    height: 20,
  },
  contactCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 14,
    fontFamily: 'nunitoSan',
  },
});

export default OrderScreen;
