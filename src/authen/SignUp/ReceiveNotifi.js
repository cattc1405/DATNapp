import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../../CustomAlert';
import CustomHeaderSignup from './CustomHeaderSignup';
import colors from '../../../assets/colors';

const ReceiveNotifi = () => {
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleOk = () => {
    setIsAlertVisible(false);
    navigation.navigate('YourPass');
  };

  const handleTurnOn = () => {
    setAlertMessage('Your changes has save!');
    setAlertTitle('Notifications!');
    setIsAlertVisible(true);
  };

  const toggleNotification = notification => {
    if (selectedNotifications.includes(notification)) {
      setSelectedNotifications(
        selectedNotifications.filter(item => item !== notification),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, notification]);
    }
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

      <CustomHeaderSignup
        stepText="Step 3/10"
        onBackPress={() => navigation.goBack()}
        onClosePress={() => navigation.navigate('Login')}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/Notifi.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>
        Do You Want to Receive{'\n'} Notifications?
      </Text>
      <Text style={styles.description}>
        Select the notifications that you want to{'\n'} receive in order to
        track every coupon.
      </Text>

      <View style={styles.notificationOptions}>
        <Text style={styles.subTitle}>YOU WILL RECEIVE NOTIFICATIONS FOR</Text>
        {[
          'Nearby Favorite Stores',
          'Exclusive Rewards and Coupons',
          'Special Offers',
        ].map(item => (
          <TouchableOpacity
            key={item}
            style={styles.option}
            onPress={() => toggleNotification(item)}>
            <View style={styles.radioButton}>
              {selectedNotifications.includes(item) && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleTurnOn}>
        <Text style={styles.buttonText}>Turn Notifications On</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('YourPass');
        }}>
        <Text style={styles.skipText}>Skip this Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    height: '100%',
    backgroundColor: colors.whiteBgr,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 190,
    height: 213,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginVertical: 10,
    fontFamily: 'nunitoSan',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginTop:5,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 20,
  },
  notificationOptions: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5,

    marginBottom: 20,
    // alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#979DA3',
    marginBottom: 10,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    justifyContent: 'flex-start',
  },
  radioButton: {
    width: 14,
    height: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  radioButtonSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#EEEEEE',
    backgroundColor: '#FF6347',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#989DA3',
    textAlign: 'center',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#F55F44',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  skipText: {
    fontSize: 16,
    color: '#F55F44',
    fontWeight: '800',
  },
});

export default ReceiveNotifi;
