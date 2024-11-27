import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';

import {getUserInfo, uploadAvatar} from '../../apiClient';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ActionSheet from 'react-native-actionsheet';
const Profile = props => {
  const {navigation} = props;
  const profileOptions = [
    {title: 'Personal Information', navigate: 'PersonalInfo'},
    {title: 'Edit Profile', navigate: 'EditProfile'},
    {title: 'Country', value: 'New York'},
    {title: 'Language', value: 'English'},
  ];

  const generalOptions = [
    {title: 'Notifications', navigate: 'Notifications'},
    {title: 'Dark Mode', navigate: 'DarkMode'},
    {title: 'Touch ID and Password', navigate: 'TouchID'},
  ];

  const supportOptions = [
    {title: 'Privacy and Security', navigate: 'PrivacySecurity'},
    {title: 'About Us', navigate: 'AboutUs'},
  ];
  const renderOption = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.navigate)}
      style={styles.optionContainer}>
      <Text style={styles.optionText}>{item.title}</Text>
      {item.value ? (
        <Text style={styles.optionValue}>{item.value}</Text>
      ) : (
        <Text style={styles.arrow}>{'>'}</Text>
      )}
    </TouchableOpacity>
  );
  const [imageUri, setImageUri] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [userInfo, setUserInfo] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await getUserInfo(userId, token);
      setUserInfo(data);
      setAvatar(data.image);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId, token]);
  if (!userInfo) return <Text>Đang tải...</Text>;
  const requestPermission = async permission => {
    const result = await check(permission);
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }
    return result === RESULTS.GRANTED;
  };

  const handlePickImage = async () => {
    const hasPermission = await requestPermission(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    if (!hasPermission) {
      Alert.alert(
        'Cần quyền truy cập',
        'Bạn cần cấp quyền truy cập thư viện ảnh!',
      );
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          setImageUri(response.assets[0].uri);
          handleUploadAvatar();
        }
      },
    );
  };

  const handleCaptureImage = async () => {
    const hasPermission = await requestPermission(PERMISSIONS.ANDROID.CAMERA);
    if (!hasPermission) {
      Alert.alert('Cần quyền truy cập', 'Bạn cần cấp quyền sử dụng máy ảnh!');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
        } else {
          setImageUri(response.assets[0].uri);
          handleUploadAvatar();
        }
      },
    );
  };

  const handleUploadAvatar = async () => {
    if (!imageUri) {
      Alert.alert('Chưa chọn hình ảnh', 'Vui lòng chọn hoặc chụp ảnh trước!');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });

    try {
      const updatedUser = await uploadAvatar(userId, formData, token);
      console.log('User updated with new avatar:', updatedUser);
      Alert.alert('Thành công', 'Đã tải lên ảnh đại diện!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Lỗi', 'Không thể tải lên ảnh đại diện!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headView}>
          <Image
            style={styles.redFoodBgr}
            source={require('../../../assets/images/redFoodBgr.png')}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{uri: imageUri || avatar}} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={handleCaptureImage}>
                <Image
                  style={{width: 36, height: 36, borderRadius: 180}}
                  source={require('../../../assets/images/icons/came.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePickImage}>
                <Image
                  style={{
                    width: 36,
                    height: 36,
                    marginLeft: 18,
                    borderRadius: 180,
                  }}
                  source={require('../../../assets/images/icons/gal.jpg')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <FlatList
              data={profileOptions}
              renderItem={renderOption}
              keyExtractor={item => item.title}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            <FlatList
              data={generalOptions}
              renderItem={renderOption}
              keyExtractor={item => item.title}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Help and Support</Text>
            <FlatList
              data={supportOptions}
              renderItem={renderOption}
              keyExtractor={item => item.title}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
            <Image
              style={styles.imgLogOut}
              source={require('../../../assets/images/icons/logoutIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Khoảng cách cuối cùng để dễ cuộn hơn
  },
  headView: {
    backgroundColor: '#ff6347',
    alignItems: 'center',
    paddingVertical: 20,
  },
  redFoodBgr: {
    width: '100%',
    height: 210,
    position: 'absolute',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
  contentContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'nunitoSan',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionValue: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'nunitoSan',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'nunitoSan',
  },
  logoutButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
    fontFamily: 'nunitoSan',
  },
  imgLogOut: {
    height: 17,
    width: 15,
  },
  //
});

export default Profile;
