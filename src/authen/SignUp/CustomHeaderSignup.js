import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';

const CustomHeaderSignup = ({stepText, onBackPress, onClosePress}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress || (() => navigation.goBack())}>
        <Image
          source={require('../../../assets/images/Back.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.stepText}>{stepText || 'Step X/Y'}</Text>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={onClosePress || (() => navigation.navigate('Login'))}>
        <Image
          source={require('../../../assets/images/Exit.png')}
          style={styles.closeIconBtn}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        marginTop:20,
        width: '100%',
        // marginLeft: '7%',
        flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    // backgroundColor:colors.whiteBgr
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    },
    closeIconBtn: {
        width: 19,
        height: 19,
        resizeMode: 'contain',
      },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  closeIcon: {
    padding: 10,
  },
});

export default CustomHeaderSignup;