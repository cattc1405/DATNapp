import {StyleSheet, Modal, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import Home from './Home/Home';
import OrderDetail from './Order/OrderDetail';
import Restaurants from './restaurants';
import Rewards from './rewards';
import WhatsInToday from './Home/WhatsInToday';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Filter from './Home/Filter';
import SlideNav from '../slidenav/SlideNav';
import ConfirmOrder from './Order/ConfimOrder';
import Order from './Order/Order';
import Restaurant1 from './Restaurant/Restaurant1';
import PaymentNavigation from '../../authen/Payment/PaymentNavigation';
import BrandDetails from './Restaurant/BrandDetails';
import CheckoutNavigator from '../../authen/Checkout/CheckoutNavigator';
import ProductDetail from '../../authen/Product/ProductDetail';
import Product from '../../authen/Product/Product';
import OrderItemScreen from './Order/OrderItemScreen';
import Profile from '../../authen/Profile/Profile';
import TestPhoto from '../../authen/Profile/TestPhoto';
import BranchMap from './Restaurant/BranchMap';
import Notification from './Home/Notification';
import EditProfile from '../../authen/Profile/EditProfile';
import PersonalInfo from '../../authen/Profile/PersonalInfo';
import Notification1 from './Home/Notification_q';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WhatsInToday"
        component={WhatsInToday}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
        }}
      /> */}
      <Stack.Screen
        name="Notifications"
        component={Notification1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SlideNav"
        component={SlideNav}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderItemScreen"
        component={OrderItemScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartStack"
        component={CartStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const RestaurantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurant1"
        component={Restaurant1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BrandDetails"
        component={BrandDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BrandMap"
        component={BranchMap}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          animationTypeForReplace: 'pop',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid, // Scale transition
        }}
      />
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{
          animationTypeForReplace: 'pop',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid, // Scale transition
        }}
      />
      <Stack.Screen
        name="CheckoutNavigator"
        component={CheckoutNavigator}
        options={{
          animationTypeForReplace: 'pop',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid, // Scale transition
        }}
      />
    </Stack.Navigator>
  );
};

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

      if (route.name === 'HomeStack') {
        iconSource = focused
          ? require('../../../assets/images/icons/HomeGreen.png')
          : require('../../../assets/images/icons/HomeGray.png');
      } else if (route.name === 'RestaurantStack') {
        iconSource = focused
          ? require('../../../assets/images/icons/RestaurantsRed.png')
          : require('../../../assets/images/icons/RestaurantsGray.png');
      } else if (route.name === 'OrderStack') {
        iconSource = focused
          ? require('../../../assets/images/icons/OrderGreen.png')
          : require('../../../assets/images/icons/OrdersGray.png');
      } else if (route.name === 'ProfileStack') {
        iconSource = focused
          ? require('../../../assets/images/profileGreen.png')
          : require('../../../assets/images/profileGray.png');
      } else if (route.name === 'CartStack') {
        iconSource = require('../../../assets/images/icons/RewardsGray.png');
      }

      return (
        <View style={{alignItems: 'center'}}>
          {focused && <View style={styles.redLine} />}
          <View
            style={[
              styles.iconContainer,
              focused && {transform: [{scale: 1.2}]},
            ]}>
            <Image source={iconSource} style={styles.icon} />
          </View>
        </View>
      );
    },
  };
};

const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          animationTypeForReplace: 'pop',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid, // Scale transition
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          animationTypeForReplace: 'pop',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid, // Scale transition
        }}
      />
      <Stack.Screen
        name="filter"
        component={Filter}
        options={{
          tabBarStyle: {display: 'none'},
          animationTypeForReplace: 'pop',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid, // Fade transition
        }}
      />
    </Stack.Navigator>
  );
};

const BottomMainTab = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="RestaurantStack"
        component={RestaurantStack}
        options={{title: 'Restaurants'}}
      />
      <Tab.Screen
        name="OrderStack"
        component={OrderStack}
        options={{title: 'Order'}}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
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
