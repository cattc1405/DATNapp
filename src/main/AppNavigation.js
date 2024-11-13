import {StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeNavigator from '../authen/Welcome/WelcomeNavigator';
import BottomMainTab from './mainTabs/BottomMainTab';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="Welcome" component={WelcomeNavigator} />
        ) : (
          <Stack.Screen name="MainTabs" component={BottomMainTab} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
