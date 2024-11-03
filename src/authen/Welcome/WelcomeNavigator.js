import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome1 from './Welcome1';
import Welcome2 from './Welcome2';
import Welcome3 from './Welcome3';
import WelcomeScreen from './WelcomeScreen';
import Checkout2 from '../Checkout/Checkout2';
const Stack = createNativeStackNavigator();
import TestCom from '../TestCom';
const WelcomeNavigator = ({onGetStarted}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Welcome1" component={Welcome1} />
      <Stack.Screen name="Welcome2" component={Welcome2} />
      <Stack.Screen name="Welcome3">
        {props => <Welcome3 {...props} onGetStarted={onGetStarted} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WelcomeNavigator;
