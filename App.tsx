import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import BottomMainTab from './src/main/mainTabs/BottomMainTab';
import SlideNav from './src/main/slidenav/SlideNav';
import Restaurant1 from './src/main/mainTabs/Restaurant/Restaurant1';
import CheckoutNavigation from './src/authen/Checkout/CheckoutNavigator';
import ForgotPassNavigation from './src/authen/ForgotPass/ForgotPassNavigation';
import PaymentNavigation from './src/authen/Payment/PaymentNavigation';
import WelcomeNavigator from './src/authen/Welcome/WelcomeNavigator';
<<<<<<< HEAD
import Step2Gender from './src/authen/Register/Step2Gender';
import Step1Gender from './src/authen/Register/Step1Gender';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Checkout2 from './src/authen/Checkout/Checkout2';
import Checkout3 from './src/authen/Checkout/Checkout3';
import Checkout4 from './src/authen/Checkout/Checkout4';
import Checkout5 from './src/authen/Checkout/Checkout5';
import Checkout6 from './src/authen/Checkout/Checkout6';
import OrderScreen from './src/authen/Checkout/Checkout1';
import LoginScreen from './src/authen/Register/Login';
=======
import LoginScreen from './src/authen/LoginScreen';
import SignUpNavigation from './src/authen/SignUp/SignUpNavigation';
import AuthNavigator from './src/authen/AuthNavigation';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

>>>>>>> cat
function App(): React.JSX.Element {
  const [isWelcomeScreenVisible, setWelcomeScreenVisible] = useState(false);

  const hideWelcomeScreen = () => {
    setWelcomeScreenVisible(false);
  };

  return (
<<<<<<< HEAD
  <SafeAreaView style={styles.container}>
    <StatusBar/>
    <LoginScreen/>
  </SafeAreaView>
=======
    <NavigationContainer>
      <Stack.Navigator>
        {isWelcomeScreenVisible ? (
          <Stack.Screen 
            name="WelcomeNavigator" 
            options={{ headerShown: false }}>
            {(props) => <WelcomeNavigator {...props} onGetStarted={hideWelcomeScreen} />} 
          </Stack.Screen>
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
            options={{ headerShown: false }} 
          />
        )}
        <Stack.Screen
          name="MainApp"
          component={BottomMainTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> cat
  );
}

export default App;
