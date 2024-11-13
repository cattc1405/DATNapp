import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Code1 from './Code1';
import FavRestaurant from './FavRestaurant';
import Finger from './Finger';
import Gender from './Gender';
import Name from './Name';
import ReceiveNotifi from './ReceiveNotifi';
import YourPass from './YourPass';
<<<<<<< HEAD
import ChooseRestaurant from './ChooseRestaurant';
import PhoneNumberScreen from './PhoneNumberScreen';
=======
import Email from './Email';
import Phone from './Phone';

>>>>>>> 52365ba6a92d41d56661c28438e356cd73131afd
const Stack = createStackNavigator();

const SignUpNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="Gender" component={Gender} />
<<<<<<< HEAD
      <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
      <Stack.Screen name="Code1" component={Code1} />
=======
      <Stack.Screen name="ReceiveNotifi" component={ReceiveNotifi} />
>>>>>>> 52365ba6a92d41d56661c28438e356cd73131afd
      <Stack.Screen name="YourPass" component={YourPass} />
      <Stack.Screen name="Finger" component={Finger} />
      <Stack.Screen name="ChooseRestaurant" component={ChooseRestaurant} />
      <Stack.Screen name="FavRestaurant" component={FavRestaurant} />
      <Stack.Screen name="Phone" component={Phone} />

      <Stack.Screen name="Email" component={Email} />

      <Stack.Screen name="Code1" component={Code1} />
    </Stack.Navigator>
  );
};

export default SignUpNavigation;

const styles = StyleSheet.create({});
