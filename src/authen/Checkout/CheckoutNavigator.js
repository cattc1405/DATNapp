import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrderScreen from './Checkout1';
import AddressScreen from './Checkout2';
import PaymentScreen from './Checkout4';
import Checkout3 from './Checkout3';
import Checkout5 from './Checkout5';
import Checkout6 from './Checkout6';

const Stack = createStackNavigator();

const CheckoutNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OrderScreen" component={OrderScreen}  />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="Checkout3" component={Checkout3} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="Checkout5" component={Checkout5} />
        <Stack.Screen name="Checkout6" component={Checkout6} />
      </Stack.Navigator>
  );
};

export default CheckoutNavigator;

const styles = StyleSheet.create({});
