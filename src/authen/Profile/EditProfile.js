import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {updateUser, changePassword, getUserInfo} from '../../apiClient';
import {useSelector} from 'react-redux';

const EditProfile = props => {
  const {navigation} = props;
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [inputValue, setInputValue] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [ConPass, setConPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [phone, setPhone] = useState('');

  // Email validation handler
  const handleEmailChange = text => {
    setEmail(text);
    if (emailRegex.test(text)) {
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  // Fetch user info from API
  const fetchUser = async () => {
    try {
      const data = await getUserInfo(userId, token);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle changing password
  const handleChangePassword = async () => {
    if (!currentPass || !newPass || !ConPass) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin mật khẩu!');
      return;
    }
    if (newPass !== ConPass) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp!');
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
      setConPass('');
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu!');
    }
  };

  // Handle profile update
  const handleEditPress = async () => {
    if (!email || emailError) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ!');
      return;
    }

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headView}>
          <Image
            style={styles.redFoodBgr}
            source={require('../../../assets/images/redFoodBgr.png')}
          />
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/BackWhite.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Your information</Text>

          {/* Name */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputView}
              placeholder="Example: John Smith"
              placeholderTextColor="rgb(177, 189, 199)"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputLabel}>Name</Text>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <TextInput
              style={[styles.inputView, emailError ? styles.inputError : null]}
              placeholder="Example: john@example.com"
              placeholderTextColor="rgb(177, 189, 199)"
              value={email}
              onChangeText={handleEmailChange}
            />
            <Text style={styles.inputLabel}>Email</Text>
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputView}
              placeholder="Example: 123-456-7890"
              placeholderTextColor="rgb(177, 189, 199)"
              value={phone}
              onChangeText={setPhone}
            />
            <Text style={styles.inputLabel}>Phone</Text>
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleEditPress}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>

          {/* Change Password Section */}
          <Text style={styles.sectionTitle}>Change password</Text>

          {/* Current Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputView}
              placeholder="********"
              secureTextEntry={!currentPasswordVisible}
              value={currentPass}
              onChangeText={setCurrentPass}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() =>
                setCurrentPasswordVisible(!currentPasswordVisible)
              }>
              <Text>{currentPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
            <Text style={styles.inputLabel}>Current password</Text>
          </View>

          {/* New Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputView}
              placeholder="********"
              secureTextEntry={!newPasswordVisible}
              onChangeText={setNewPass}
              value={newPass}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
              <Text>{newPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
            <Text style={styles.inputLabel}>New password</Text>
          </View>

          {/* Confirm New Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputView}
              placeholder="********"
              secureTextEntry={!confirmPasswordVisible}
              value={ConPass}
              onChangeText={setConPass}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }>
              <Text>{confirmPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
            <Text style={styles.inputLabel}>Confirm new password</Text>
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleChangePassword}>
            <Text style={styles.updateButtonText}>Update</Text>
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
    paddingBottom: 20,
  },
  headView: {
    backgroundColor: '#ff6347',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
    marginTop: 10,
  },
  redFoodBgr: {
    width: '100%',
    height: 210,
    position: 'absolute',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
    top: 8,
  },
  iconBack: {
    position: 'absolute',
    left: 20,
    top: '100%',
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'nunitoSan',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#979DA3',
    marginBottom: 10,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'nunitoSan',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    padding: 10,
    fontSize: 12,

    backgroundColor: '#f7f7f7',
    fontFamily: 'nunitoSan',
    fontWeight: '700',
  },
  inputLabel: {
    position: 'absolute',
    fontFamily: 'nunitoSan',
    left: 20,
    fontWeight: '700',
    color: '#F55F44',
    top: -11,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
    textTransform: 'uppercase',
  },
  updateButton: {
    backgroundColor: '#ff6347',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'nunitoSan',
  },
  containText: {
    marginTop: 10,
    fontWeight: '900',
    fontSize: 9,
    color: '#979DA3',
    fontFamily: 'nunitoSan',
  },
  checkList: {
    marginTop: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  containCheck: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  atLeastText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#4d4d4d',
    fontFamily: 'nunitoSan',
  },
  inputError: {
    borderColor: '#FF0000', // Red color for error
  },

  errorText: {
    color: '#FF0000', // Red error text
    fontSize: 12,
    marginTop: 5,
    marginLeft: 115,
    position: 'relative',
  },
});

export default EditProfile;
