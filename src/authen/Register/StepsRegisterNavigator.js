import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Step1Register from './Step1Register';
import Step2Register from './Step2Register';
import Step3Register from './Step3Register';

const Stack = createNativeStackNavigator();

const RegisterNavigator = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="Step1" component={Step1Register} />
        <Stack.Screen name="Step2" component={Step2Register} />
        <Stack.Screen name="Step3" component={Step3Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RegisterNavigator;