import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/authen/Welcome/WelcomeScreen';
import Welcome1 from './src/authen/Welcome/Welcome1';
import Welcome2 from './src/authen/Welcome/Welcome2';
import WelcomeNavigator from './src/authen/Welcome/WelcomeNavigator';
import Step2Gender from './src/authen/Register/Step2Gender';
import Step1Gender from './src/authen/Register/Step1Gender';
import ForgetPass from './src/authen/ForgotPass/ForgetPass';
import NewPass from './src/authen/ForgotPass/NewPass';
import Gender from './src/authen/SignUp/Gender';
import Code from './src/authen/ForgotPass/Code';
import Restaurant1 from './src/authen/Restaurant/Restaurant1';
import FavRestaurant from './src/authen/SignUp/FavRestaurant';
import ReceiveNotifi from './src/authen/SignUp/ReceiveNotifi';
import YourPass from './src/authen/SignUp/YourPass';
import Code1 from './src/authen/SignUp/Code1';
import Finger from './src/authen/SignUp/Finger';
import Name from './src/authen/SignUp/Name';
import Payment1 from './src/authen/Payment/Payment1';
import Payment4 from './src/authen/Payment/Payment4';
import Payment5 from './src/authen/Payment/Payment5';
import PhoneNumberScreen from './src/authen/SignUp/PhoneNumberScreen';
import ChooseRestaurant from './src/authen/SignUp/ChooseRestaurant';
// import Code from './src/authen/DATN/Code';
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  // const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer >
      <StatusBar />
      <Stack.Navigator initialRouteName="FavRestaurant">
        <Stack.Screen name="ForgetPass" component={ForgetPass} options={{ headerShown: false }} />
        <Stack.Screen name="Code" component={Code} options={{ headerShown: false }} />
        <Stack.Screen name="NewPass" component={NewPass} options={{ headerShown: false }} />
        <Stack.Screen name="Gender" component={Gender} options={{ headerShown: false }} />
        <Stack.Screen name="Restaurant1" component={Restaurant1} options={{ headerShown: false }} />
        <Stack.Screen name="FavRestaurant" component={FavRestaurant} options={{ headerShown: false }} />
        <Stack.Screen name="ReceiveNotifi" component={ReceiveNotifi} options={{ headerShown: false }} />
        <Stack.Screen name="YourPass" component={YourPass} options={{ headerShown: false }} />
        <Stack.Screen name="Code1" component={Code1} options={{ headerShown: false }} />
        <Stack.Screen name="Finger" component={Finger} options={{ headerShown: false }} />
        <Stack.Screen name="Name" component={Name} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseRestaurant" component={ChooseRestaurant} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Payment1" component={Payment1} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Payment4" component={Payment4} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Payment5" component={Payment5} options={{ headerShown: false }} /> */}








      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
