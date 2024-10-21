import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpNavigation from './SignUp/SignUpNavigation';
import ForgotPassNavigation from './ForgotPass/ForgotPassNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="SignUpNavi" component={SignUpNavigation} /> */}

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUpNavi" component={SignUpNavigation} />
      <Stack.Screen name="ForgotPassNavi" component={ForgotPassNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
