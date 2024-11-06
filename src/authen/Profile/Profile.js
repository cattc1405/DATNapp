import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserInfo, updateUser, uploadAvatar} from '../../apiClient';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Profile = () => {
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
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
    fetchUser();
  }, [userId, token]);

  const handleEditPress = async () => {
    const userForm = {
      name,
      email,
      phone,
    };

    try {
      await updateUser(userId, userForm, token);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Failed to update profile!');
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
        'Permission required',
        'Permission to access photo library is required!',
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
      Alert.alert(
        'Permission required',
        'Permission to access the camera is required!',
      );
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
      Alert.alert(
        'No image selected',
        'Please select or capture an image first!',
      );
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
      Alert.alert('Success', 'Avatar uploaded successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'Failed to upload avatar!');
    }
  };

  if (!userInfo) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image source={{uri: imageUri || avatar}} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleUploadAvatar}>
          <Text style={styles.editButtonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={handlePickImage}>
          <Text style={styles.editButtonText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleCaptureImage}>
          <Text style={styles.editButtonText}>Cam</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
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
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <TouchableOpacity onPress={handleEditPress} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Info */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Email: {userInfo.email}</Text>
        <Text style={styles.detailLabel}>Phone: {userInfo.phone}</Text>
        <Text style={styles.detailLabel}>Contact: {userInfo.contact?.[0]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default Profile;
