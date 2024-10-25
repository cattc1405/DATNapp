import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SlideNav = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.headView}>
          <Image
            style={styles.redFoodBgr}
            source={require('../../../assets/images/redFoodBgr.png')}
            borderTopRightRadius={30}
          />
          <View style={styles.menuView}>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={styles.iconMenuView}
                source={require('../../../assets/images/icons/whiteBackArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainView}>
          <Image
            style={styles.avatar}
            source={require('../../../assets/images/avatar.jpg')}
          />
          <TouchableOpacity style={styles.upgradeBtn}>
            <Text style={styles.upgradeText}>Upgrade</Text>
          </TouchableOpacity>
          <View style={styles.spaceBetwnView}>
            <View style={styles.nameAndCountry}>
              <View style={styles.nameAndEditView}>
                <Text style={styles.nameText}>Mafalda Matias</Text>
                <Image
                  style={styles.editIcon}
                  source={require('../../../assets/images/icons/editPencil.png')}
                />
              </View>
              <Text style={styles.countryText}>New York, USA</Text>
            </View>
            <View style={styles.lineView} />
            <Text style={styles.titleBoldText}>Account</Text>
            <View style={styles.accProperties}>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Personal Information</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Edit Profile</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Country</Text>
                <Text style={styles.valueProper}>New York</Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Language</Text>
                <Text style={styles.valueProper}>English</Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
            </View>

            {/* General */}
            <Text style={styles.titleBoldText}>General</Text>
            <View style={styles.accProperties}>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Notifications</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Dark Mode</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Touch ID and Password</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
            </View>
            {/* Help and sp */}
            <Text style={styles.titleBoldText}>Help and support</Text>
            <View style={styles.accProperties}>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Privacy and Security</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>About Us</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.lineView} />
            <TouchableOpacity style={styles.logoutView} onPress={() => navigation.navigate('Auth')}>
              <Image
                style={styles.iconLogout}
                source={require('../../../assets/images/icons/logoutIcon.png')}
              />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}></View>
    </View>
  );
};
export default SlideNav;
const styles = StyleSheet.create({
  logoutText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'nunitoSan',
    color: '#E66767',
    fontWeight: 'bold',
  },
  iconLogout: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  logoutView: {
    marginLeft: 30,
    flexDirection: 'row',
  },
  titleProper: {
    width: '65%',
    fontSize: 14,
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    fontWeight: 'bold',
  },
  valueProper: {
    width: '30%',
    fontSize: 12,
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    fontWeight: 'normal',
  },
  arrowGray: {
    width: '5%',
    height: 14,
    resizeMode: 'contain',
  },
  properView: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.7,
    marginVertical: 5,
  },
  accProperties: {
    marginLeft: 30,
    marginRight: 40,
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  spaceBetwnView: {
    marginTop: 60,
    justifyContent: 'space-evenly',
    // backgroundColor: 'pink',
    height: '85%',
  },
  lineView: {
    height: 0.4,
    width: '100%',
    backgroundColor: '#979DA3',
  },
  nameAndCountry: {
    marginLeft: 30,
  },
  countryText: {
    fontSize: 16,
    fontFamily: 'nunitoSan',
    color: '#979DA3',
    fontWeight: 'normal',
  },
  nameText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
  },
  editIcon: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  nameAndEditView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    color: '#F55F44',
    fontFamily: 'nunitoSan',
    fontSize: 14,
    fontWeight: 'bold',
  },
  upgradeBtn: {
    width: 120,
    height: 46,
    elevation: 4,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
    borderRadius: 15,
    top: -23,
  },
  avatar: {
    width: 100,
    height: 100,
    position: 'absolute',
    left: 30,
    borderRadius: 50,
    top: -50,
  },
  mainView: {
    height: '80%',
    backgroundColor: '#fff',
    borderBottomRightRadius: 30,
    elevation: 1,
  },
  menuView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '18%',
    alignItems: 'center',
  },
  rightContainer: {
    width: '20%',
    backgroundColor: 'white',
    opacity:0.5,
    height: '100%',
  },
  leftContainer: {
    width: '80%',
    height: '100%',
    backgroundColor:'none'
  },
  container: {
    width: '100%',
    height: '100%',
    
    flexDirection:'row'
  },
  headView: {
    width: '100%',
    height: '20%',
    elevation: 5,
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
