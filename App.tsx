import React from 'react';
import WelcomeScreen from './src/authen/Welcome/WelcomeScreen';
import Welcome2 from './src/authen/Welcome/Welcome2';
import WelcomeNavigator from './src/authen/Welcome/WelcomeNavigator';
import Step2Gender from './src/authen/Register/Step2Gender';
import Step1Gender from './src/authen/Register/Step1Gender';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Checkout2 from './src/authen/Checkout/Checkout2';
import Checkout3 from './src/authen/Checkout/Checkout3';
import Checkout4 from './src/authen/Checkout/Checkout4';
import Checkout5 from './src/authen/Checkout/Checkout5';
import Checkout6 from './src/authen/Checkout/Checkout6';
import OrderScreen from './src/authen/Checkout/Checkout1';
function App(): React.JSX.Element {
  return (
  <SafeAreaView style={styles.container}>
    <StatusBar/>
    <OrderScreen/>
  </SafeAreaView>
  );
}
export default App;
const  styles = StyleSheet.create({
  container:{
    flex: 1
  }
})
