import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './Home/Home';
import Order from './order';
import Restaurants from './restaurants';
import Rewards from './rewards';
import WhatsInToday from './Home/WhatsInToday';

import { createStackNavigator } from '@react-navigation/stack'; 
import Filter from './Home/Filter';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="WhatsInToday" component={WhatsInToday} options={{ headerShown: false }} />
      <Stack.Screen name="Filter" component={Filter}
        options={{
          headerShown: false,
          tabBarStyle:{display:'none'}
        }}
      />
    </Stack.Navigator>
  );
};

const tabScreenOptions = ({ route }) => {
  return {
    headerShown: false,
    tabBarStyle: { backgroundColor: '#fff' },
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: '500',
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarIcon: ({ focused }) => {
      let iconSource;

      if (route.name === 'HomeStack') {
        iconSource = focused
          ? require('../../../assets/images/icons/HomeGreen.png')
          : require('../../../assets/images/icons/HomeGray.png');
      } else if (route.name === 'Restaurants') {
        iconSource = focused
          ? require('../../../assets/images/icons/RestaurantsRed.png')
          : require('../../../assets/images/icons/RestaurantsGray.png');
      } else if (route.name === 'Order') {
        iconSource = require('../../../assets/images/icons/OrdersGray.png');
      } else if (route.name === 'Rewards') {
        iconSource = require('../../../assets/images/icons/RewardsGray.png');
      }

      return (
        <View style={{ alignItems: 'center' }}>
          {focused && <View style={styles.redLine} />}
          <View style={[styles.iconContainer, focused && { transform: [{ scale: 1.2 }] }]}>
            <Image source={iconSource} style={styles.icon} />
          </View>
        </View>
      );
    },
  };
};

const BottomMainTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="Restaurants" component={Restaurants} />
        <Tab.Screen name="Order" component={Order} />
        <Tab.Screen name="Rewards" component={Rewards} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomMainTab;

const styles = StyleSheet.create({
  iconContainer: {
    width: 20,
    height: 30,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  redLine: {
    height: 2,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 2,
  },
});