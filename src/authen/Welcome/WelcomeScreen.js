import {StyleSheet, Text, View, Image} from 'react-native';
import React,{useEffect} from 'react';

const WelcomeScreen = ({ navigation }) => {
  // const {navigation} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome1');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.bgrImg} />
      <Image
        style={styles.logoImg}
        source={require('../../../assets/images/logo.png')}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  logoImg: {
    position: 'absolute',
    width: '50%',
    resizeMode: 'contain',
  },
  bgrImg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
