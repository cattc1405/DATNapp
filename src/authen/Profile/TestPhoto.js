import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {uploadAvatar} from '../../apiClient'; // Assuming your API client is set up correctly

const TestPhoto = () => {
  const [imageUri, setImageUri] = useState(null); // State to store the image URI
  const userId = useSelector(state => state.auth.user?.userId);
  const token = useSelector(state => state.auth.user?.token);

  // Function to check and request permissions
  const requestPermission = async permission => {
    const result = await check(permission); // Check current permission status
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      // If permission is denied, request it
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }
    return result === RESULTS.GRANTED;
  };

  // Handle image picking from gallery
  const handlePickImage = async () => {
    const hasPermission = await requestPermission(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    if (!hasPermission) {
      alert('Permission to access photo library is required!');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo', // Only allow images
        includeBase64: false, // Don't include base64 encoded data
        quality: 1, // Full quality
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          setImageUri(response.assets[0].uri); // Save the URI of the selected image
        }
      },
    );
  };

  // Handle image capture from camera
  const handleCaptureImage = async () => {
    const hasPermission = await requestPermission(PERMISSIONS.ANDROID.CAMERA);
    if (!hasPermission) {
      alert('Permission to access the camera is required!');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo', // Capture photo only
        includeBase64: false,
        quality: 1, // Full quality
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
        } else {
          setImageUri(response.assets[0].uri); // Save the URI of the captured image
        }
      },
    );
  };

  // Handle uploading the avatar
  const handleUploadAvatar = async () => {
    if (!imageUri) {
      alert('Please select or capture an image first!');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });

    try {
      const updatedUser = await uploadAvatar(userId, formData, token);
      console.log('User updated with new avatar:', updatedUser);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>TestPhoto</Text>
      <Button title="Pick an image from gallery" onPress={handlePickImage} />
      <Button
        title="Capture an image with camera"
        onPress={handleCaptureImage}
      />

      {imageUri && (
        <View>
          <Text>Selected Image:</Text>
          <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
        </View>
      )}

      <Button title="Upload Avatar" onPress={handleUploadAvatar} />
    </View>
  );
};

export default TestPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
