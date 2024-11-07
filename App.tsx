import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import BottomMainTab from './src/main/mainTabs/BottomMainTab';
import SlideNav from './src/main/slidenav/SlideNav';
import Restaurant1 from './src/main/mainTabs/Restaurant/Restaurant1';
import CheckoutNavigation from './src/authen/Checkout/CheckoutNavigator';
import ForgotPassNavigation from './src/authen/ForgotPass/ForgotPassNavigation';
import PaymentNavigation from './src/authen/Payment/PaymentNavigation';
import WelcomeNavigator from './src/authen/Welcome/WelcomeNavigator';
// import Step2Gender from './src/authen/Register/Step2Gender';
// import Step1Gender from './src/authen/Register/Step1Gender';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Checkout2 from './src/authen/Checkout/Checkout2';
import Checkout3 from './src/authen/Checkout/Checkout3';
import Checkout4 from './src/authen/Checkout/Checkout4';
import Checkout5 from './src/authen/Checkout/Checkout5';
import OrderScreen from './src/authen/Checkout/Checkout1';
// import LoginScreen from './src/authen/Register/Login';
import LoginScreen from './src/authen/LoginScreen';
import SignUpNavigation from './src/authen/SignUp/SignUpNavigation';
import AuthNavigator from './src/authen/AuthNavigation';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import store from './src/redux/store';

function App(): React.JSX.Element {
  const [isWelcomeScreenVisible, setWelcomeScreenVisible] = useState(true);
  GoogleSignin.hasPlayServices();

  const hideWelcomeScreen = () => {
    setWelcomeScreenVisible(false);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isWelcomeScreenVisible ? (
            <Stack.Screen
              name="WelcomeNavigator"
              options={{headerShown: false}}>
              {props => (
                <WelcomeNavigator {...props} onGetStarted={hideWelcomeScreen} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="MainApp"
            component={BottomMainTab}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
