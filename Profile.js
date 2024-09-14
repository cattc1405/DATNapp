import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('Nguyễn Văn A');
  const [email, setEmail] = useState('nguyenvana@gmail.com.vn');
  const [password, setPassword] = useState('********');
  const [address, setAddress] = useState('330 ấp 1, Tân Lập 1, Tân Phước, Tiền Giang');

  const handleSave = () => {
    console.log('Profile saved:', { name, email, password, address });
  };

  const handleChangeProfilePicture = () => {
    console.log('Change Profile Picture');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
          style={styles.profilePicture}
        />
        <TouchableOpacity onPress={handleChangeProfilePicture} style={styles.editIconContainer}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Họ và tên *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên"
      />

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Mật khẩu *</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Nhập mật khẩu"
        secureTextEntry
      />

      <Text style={styles.label}>Địa chỉ *</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Nhập địa chỉ"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#34A853',
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    fontSize: 16,
    color: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#34A853',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
