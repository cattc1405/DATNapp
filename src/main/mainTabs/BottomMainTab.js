import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import Home from './home';
import Order from './order';
import Restaurants from './restaurants';
import Rewards from './rewards';

const Tab = createBottomTabNavigator();
const tabScreenOptions = ({route}) => {
  return {
    headerShown: false,
    tabBarStyle: {backgroundColor: '#fff'},
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: '500',
    },

    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarIcon: ({focused}) => {
      let iconSource;

      // Lấy icon phù hợp dựa vào route.name và trạng thái focused
      if (route.name === 'Home') {
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
        <View style={{alignItems: 'center'}}>
          {focused && (
            <View
              style={styles.redLine}
            />
          )}
          <View style={styles.iconContainer}>
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
        <Tab.Screen name="Home" component={Home} />
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
    alignItems:'center'
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode:'contain'
  },
  redLine: {
    height: 2,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 2,
     },
});
