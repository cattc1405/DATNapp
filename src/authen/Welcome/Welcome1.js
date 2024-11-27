import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Welcome1 = props => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgrImg}
        source={require('../../../assets/images/welcome1pic.jpg')}
      />
      <View style={styles.contentWelcome}>
        <View style={styles.threeLineView}>
          <View style={styles.lineNavi} />
          <View style={styles.lineNot} />
          <View style={styles.lineNot} />
        </View>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.decribeText}>
          Find your favorite restaurants and win
        </Text>
        <Text style={styles.decribeText}>points and amazing rewards for</Text>
        <Text style={styles.decribeText}>each purchase.</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btnContainer}>
          <Text
            style={styles.continueText}
            onPress={() => navigation.navigate('Welcome2')}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={styles.skipText}>Skip</Text>
      </View>
    </View>
  );
};

export default Welcome1;

const styles = StyleSheet.create({
  skipText: {
    fontFamily: 'nunitoSan',
    color: '#F55F44',
    fontSize: 15,
    marginTop: '3.5%',
    fontWeight: '700',
  },
  btnContainer: {
    width: '65%',
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F55F44',
  },
  continueText: {
    fontFamily: 'nunitoSan',
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  btnView: {
    width: '100%',
    height: '20%',
    //   backgroundColor: 'red',
    alignItems: 'center',
  },
  decribeText: {
    color: 'yellow',
    fontWeight: '200',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '7%',
    marginBottom: '2%',
    fontFamily: 'nunitoSan',
  },
  lineNot: {
    width: '7%',
    height: '100%',
    borderRadius: 10,
    marginHorizontal: '1.6%',
    backgroundColor: '#E1E0E0',
  },
  lineNavi: {
    width: '7%',
    height: '100%',
    borderRadius: 10,
    marginHorizontal: '1.6%',
    backgroundColor: '#F55F44',
  },
  threeLineView: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    height: '1.6%',
    //   backgroundColor:'red'
  },
  contentWelcome: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },
  bgrImg: {
    width: '100%',
    height: '55%',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F6FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
