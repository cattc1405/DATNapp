import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import {getUserInfo, updateUser} from '../../apiClient';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomAlert from '../../CustomAlert';

const {width, height} = Dimensions.get('window');

const OrderScreen = ({navigation}) => {
  const [showContacts, setShowContacts] = useState(false);
  const [user, setUser] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContact, setNewContact] = useState('');
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const handleOk = () => {
    setIsAlertVisible(false);
  };
  const animationValue = useSharedValue(0);

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

  const handleAddContact = async () => {
    if (newContact.trim()) {
      const updatedContacts = {
        ...user.contact,
        [`Contact ${Object.keys(user.contact || {}).length + 1}`]: newContact,
      };
      const updatedUser = {...user, contact: updatedContacts};

      try {
        await updateUser(userId, updatedUser, token);
        setUser(updatedUser); // Update local state with new contact
        setNewContact(''); // Clear input
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };
  const handleRemoveContact = async index => {
    const updatedContacts = user.contact.filter((_, i) => i !== index);
    const updatedUser = {...user, contact: updatedContacts};

    try {
      await updateUser(userId, updatedUser, token);
      setUser(updatedUser); // Update state with the removed contact
    } catch (error) {
      console.error('Error removing contact:', error);
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={() => {
        setSelectedContact(item);
        setShowContacts(false);
      }}>
      <Text style={styles.contactName}>{item}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveContact(index)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backArrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 1/3</Text>
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
          {user.contact && Object.keys(user.contact).length > 0 ? (
            <View>
              <FlatList
                data={Object.values(user.contact)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.scrollContainer}
              />
              <View style={styles.addContactContainer}>
                <TextInput
                  style={styles.contactInput}
                  placeholder="Enter new contact"
                  value={newContact}
                  onChangeText={setNewContact}
                />
                <TouchableOpacity
                  style={styles.changeContactButton2}
                  onPress={handleAddContact}>
                  <Text style={styles.changeContactButtonText}>
                    Add Contact
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text>No contacts available. Add a new one below.</Text>
          )}
        </Animated.View>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (!selectedContact) {
            setAlertMessage('Vui lòng chọn một liên hệ!');
            setAlertTitle('Thiếu thông tin!');
            setIsAlertVisible(true);
            return;
          }
          navigation.navigate('AddressScreen', {selectedContact});
        }}>
        <Text style={styles.nextButtonText}>Bước Tiếp Theo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  changeContactButton2: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 70,
    marginTop: 10,
    justifyContent: 'space-between',
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
  hamburger: {
    marginTop: 20,
    marginBottom: 40,
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
    // fontFamily: 'nunitoSan',
    fontWeight: '600',
  },
  contactBox: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    elevation:5,
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
  removeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    padding: 5,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'nunitoSan',
  },
});

export default OrderScreen;
