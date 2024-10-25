import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const ReceiveNotifi = props => {
    const { navigation } = props;
    const [selectedNotifications, setSelectedNotifications] = useState([]);

    const toggleNotification = (notification) => {
        if (selectedNotifications.includes(notification)) {
            setSelectedNotifications(selectedNotifications.filter((item) => item !== notification));
        } else {
            setSelectedNotifications([...selectedNotifications, notification]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Icon quay lại và đóng */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} // Navigate back
                >
                    <Image source={require('../../../assets/images/Back.png')} />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 10/10</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image source={require('../../../assets/images/Exit.png')} />
                </TouchableOpacity>
            </View>

            {/* Hình ảnh minh họa */}
            <Image source={require('../../../assets/images/Notifi.png')} style={styles.image} />

            {/* Tiêu đề và mô tả */}
            <Text style={styles.title}>Do You Want to Receive Notifications?</Text>
            <Text style={styles.description}>
                Select the notifications that you want to receive in order to track every coupon.
            </Text>

            {/* Tùy chọn thông báo */}
            <View style={styles.notificationOptions}>
                {['Nearby Favorite Stores', 'Exclusive Rewards and Coupons', 'Special Offers'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={styles.option}
                        onPress={() => toggleNotification(item)}
                    >
                        <View style={styles.radioButton}>
                            {selectedNotifications.includes(item) && <View style={styles.radioButtonSelected} />}
                        </View>
                        <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Nút bật thông báo và bỏ qua */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Turn Notifications On</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.skipText}>Skip this Step</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    headerButton: {
        fontSize: 20,
        color: '#333',
    },
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    notificationOptions: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF6347',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF6347',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#FF6347',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipText: {
        fontSize: 16,
        color: '#FF6347',
        textDecorationLine: 'underline',
    },
});

export default ReceiveNotifi;
