import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,

  // Import ScrollView
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getUserInfo,
  updateUser,
  uploadAvatar,
  changePassword,
} from '../../apiClient';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';

const Profile1 = () => {
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // New state for password change
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleChangePassword = async () => {
    if (!currentPass || !newPass) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin mật khẩu!');
      return;
    }

    const passwordData = {
      userId: userId,
      currentPassword: currentPass,
      newPassword: newPass,
    };

    try {
      await changePassword(passwordData, token);
      Alert.alert('Thành công', 'Đã thay đổi mật khẩu thành công!');
      setCurrentPass('');
      setNewPass('');
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu!');
    }
  };
  const fetchUser = async () => {
    try {
      const data = await getUserInfo(userId, token);
      setUserInfo(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAvatar(data.image);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Your code to run when the screen is focused
      fetchUser();

      // Optionally, return a cleanup function if needed
      return () => {
        // Cleanup code (if any)
      };
    }, [userId, token]), // You can add any dependencies here
  );
  const handleEditPress = async () => {
    const userForm = {
      name,
      email,
      phone,
    };

    try {
      await updateUser(userId, userForm, token);
      Alert.alert('Thành công', 'Cập nhật thông tin cá nhân thành công!');
      fetchUser();
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin cá nhân!');
    }
  };

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

  if (!userInfo) return <Text>Đang tải...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image source={{uri: imageUri || avatar}} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleUploadAvatar}>
          <Text style={styles.editButtonText}>Tải lên</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.editButton} onPress={handlePickImage}>
            <Text style={styles.editButtonText}>Thư viện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleCaptureImage}>
            <Text style={styles.editButtonText}>Máy ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Tên"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
        />
        <TouchableOpacity onPress={handleEditPress} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* Change Password */}
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          value={currentPass}
          onChangeText={setCurrentPass}
          placeholder="Mật khẩu hiện tại"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
          placeholder="Mật khẩu mới"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
      {/* Additional Info */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Email: {userInfo.email}</Text>
        <Text style={styles.detailLabel}>Name: {userInfo.name}</Text>
        <Text style={styles.detailLabel}>Số điện thoại: {userInfo.phone}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e9eff1',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
    borderColor: '#4a90e2',
    borderWidth: 2,
  },
  editButton: {
    backgroundColor: '#5a9ee1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa nội dung
    width: 150, // Đặt chiều rộng cố định để các nút có kích thước bằng nhau
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 14,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default Profile1;
