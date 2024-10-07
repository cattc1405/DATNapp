import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet,ScrollView,Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/authen/Welcome/WelcomeScreen';
import Welcome1 from './src/authen/Welcome/Welcome1';
import Welcome2 from './src/authen/Welcome/Welcome2';
import WelcomeNavigator from './src/authen/Welcome/WelcomeNavigator';
import Step2Gender from './src/authen/Register/Step2Gender';
import Step1Gender from './src/authen/Register/Step1Gender';
import ForgetPass from './src/authen/DATN/ForgetPass';
import NewPass from './src/authen/DATN/NewPass';
import Gender from './src/authen/DATN/Gender';
// import Code from './src/authen/DATN/Code';
function App(): React.JSX.Element {
const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
  return 
  (
    <NavigationContainer>
    <StatusBar />
    <Stack.Navigator initialRouteName="Restaurant1">
      <Stack.Screen name="ForgetPass" component={ForgetPass} options={{ headerShown: false }} />
      <Stack.Screen name="Code" component={Code} options={{ headerShown: false }} />
      <Stack.Screen name="NewPass" component={NewPass} options={{ headerShown: false }} />
      <Stack.Screen name="Restaurant" component={Restaurant} options={{headerShown:false}}/>
      <Stack.Screen name="Restaurant1" component={Restaurant1} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
export default App;
