import React from 'react';
import WelcomeScreen from './src/authen/Welcome/WelcomeScreen';
import Welcome1 from './src/authen/Welcome/Welcome1';
import Welcome2 from './src/authen/Welcome/Welcome2';
import WelcomeNavigator from './src/authen/Welcome/WelcomeNavigator';
import Step2Register from './src/authen/Register/Step2Register';
import Step1Register from './src/authen/Register/Step1Register';
import Step3Register from './src/authen/Register/Step3Register';
import RegisterNavigator from './src/authen/Register/StepsRegisterNavigator';
import BottomMainTab from './src/main/mainTabs/BottomMainTab';


function App(): React.JSX.Element {
  return <BottomMainTab />;
}
export default App;
