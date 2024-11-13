import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Code from './Code';
import NewPass from './NewPass';
import ForgetPass from './ForgetPass';

const Stack = createNativeStackNavigator();

const ForgotPassNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="Code" component={Code} />
      <Stack.Screen name="NewPass" component={NewPass} />
    </Stack.Navigator>
  );
};

export default ForgotPassNavigator;
