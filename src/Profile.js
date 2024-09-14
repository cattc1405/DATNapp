import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Manhinh from './Manhinh';
import ABc from './ABc';

const Tab = createBottomTabNavigator();

const Profile = () => {
  const [securePassword, setSecurePassword] = useState(true);

  return (
    <View style={styles.container}>
      {/* avatar */}
      <View style={styles.avtView}>
        <Image
          style={styles.avt}
          source={require('../assets/images/hinh1.jpg')}
        />
        <View style={styles.iconEditView}>
          <Image
            style={styles.editAvtBtn}
            source={require('../assets/images/editGr.jpg')}
          />
        </View>
      </View>

      {/* main */}
      <View style={styles.mainView}>
        <View style={styles.cangiua}>
          <Text style={styles.textBold}>Họ và tên</Text>
          <Text style={styles.starI}>*</Text>
        </View>
        <View style={styles.inputcontai}>
          <TextInput placeholder="Nguyễn Văn A" style={styles.inputNormal} />
        </View>
        <View style={styles.cangiua}>
          <Text style={styles.textBold}>Email</Text>
          <Text style={styles.starI}>*</Text>
        </View>
        <View style={styles.inputcontai}>
          <TextInput
            placeholder="nguyenvana@gmail.com"
            style={styles.inputNormal}
          />
        </View>
        <View style={styles.cangiua}>
          <Text style={styles.textBold}>Mật khẩu</Text>
          <Text style={styles.starI}>*</Text>
        </View>
        <View style={styles.inputcontai}>
          <TextInput
            secureTextEntry={securePassword}
            placeholder="******"
            style={styles.inputNormal}
          />
          <TouchableOpacity
            onPress={() => setSecurePassword(!securePassword)}
            style={styles.eye}>
            <Image source={require('../assets/images/eye.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.cangiua}>
          <Text style={styles.textBold}>Địa chỉ</Text>
          <Text style={styles.starI}>*</Text>
        </View>
        <View style={styles.inputcontai}>
          <TextInput
            placeholder="42/6 Hà thị khiêm, Quận 12, Tp.HCM"
            style={styles.inputNormal}
          />
        </View>

        {/* 2 btn */}
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.huyBtn}>
            <Text style={styles.huyText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.luuBtn}>
            <Text style={styles.luuText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MainTabsNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Manhinh} />
      <Tab.Screen name="Search" component={ABc} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MainTabsNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconEditView: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    bottom: 0,
    right: 0,
    position: 'absolute',

    backgroundColor: 'green',
  },
  eye: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  cangiua: {
    display: 'flex',
    flexDirection: 'row',
  },
  starI: {
    marginLeft: 3,

    color: 'red',
  },
  luuText: {
    color: 'white',
  },
  huyText: {
    color: 'black',
  },
  container: {
    height: '100%',
  },
  luuBtn: {
    width: 70,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  huyBtn: {
    width: 70,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  btnView: {
    width: '70%',
    marginTop: 35,
    alignSelf: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
  },
  textBold: {
    color: 'black',
    marginVertical: 3,
    fontSize: 14,
    fontWeight: '500',
  },
  mainView: {
    width: '95%',
    marginLeft: '3%',
    height: '100%',
  },
  inputcontai: {
    width: '96%',
    marginBottom: 5,
    marginTop: 1,
  },
  inputNormal: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
  },
  editAvtBtn: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: 0,
    right: 0,
  },
  avtView: {
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  avt: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
