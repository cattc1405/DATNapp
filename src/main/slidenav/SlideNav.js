import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slice/authSlice';
import {logoutUser} from '../../redux/slice/authSlice';

const SlideNav = ({onClose}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* Phần menu bên trái */}
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

        {/* Phần chính */}
        <View style={styles.mainView}>
          {/* Avatar người dùng */}
          <Image
            style={styles.avatar}
            source={require('../../../assets/images/avatar.jpg')}
          />
          <TouchableOpacity style={styles.upgradeBtn}>
            <Text style={styles.upgradeText}>Nâng cấp</Text>
          </TouchableOpacity>

          {/* Các mục */}
          <View style={styles.spaceBetwnView}>
            <View style={styles.nameAndCountry}>
              <View style={styles.nameAndEditView}>
                <Text style={styles.nameText}>Admin</Text>
                <Image
                  style={styles.editIcon}
                  source={require('../../../assets/images/icons/editPencil.png')}
                />
              </View> 
              <Text style={styles.countryText}>Hồ Chí Minh, VIETNAM</Text>
            </View>

            <View style={styles.lineView} />
            <Text style={styles.titleBoldText}>Tài khoản</Text>

            {/* Tùy chọn tài khoản */}
            <View style={styles.accProperties}>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Thông tin cá nhân</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Chỉnh sửa hồ sơ</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Quốc gia</Text>
                <Text style={styles.valueProper}>Việt Nam</Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Ngôn ngữ</Text>
                <Text style={styles.valueProper}>Việt Nam</Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
            </View>

            {/* Cài đặt chung */}
            <Text style={styles.titleBoldText}>Cài đặt chung</Text>
            <View style={styles.accProperties}>
              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Thông báo</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.properView}>
                <Text style={styles.titleProper}>Chế độ tối</Text>
                <Text style={styles.valueProper}></Text>
                <Image
                  style={styles.arrowGray}
                  source={require('../../../assets/images/icons/grayArrow.png')}
                />
              </TouchableOpacity>
            </View>

            {/* Đăng xuất */}
            
          </View>
          <TouchableOpacity
              style={styles.logoutView}
              onPress={() => {
                navigation.navigate('Login');
                dispatch(logoutUser());
              }}>
              <Image
                style={styles.iconLogout}
                source={require('../../../assets/images/icons/logoutIcon.png')}
              />
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
      </View>
      {/* Phần menu bên phải */}
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
    marginTop: -15
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
    marginTop: -40
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: -20
  },
  spaceBetwnView: {
    marginTop: 60,
    justifyContent:'space-evenly',
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
    opacity: 0.5,
    height: '100%',
  },
  leftContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: 'none',
  },
  container: {
    width: '100%',
    height: '100%',

    flexDirection: 'row',
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
