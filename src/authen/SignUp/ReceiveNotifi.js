import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ReceiveNotifi = () => {
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const navigation = useNavigation();

    const toggleNotification = (notification) => {
        if (selectedNotifications.includes(notification)) {
            setSelectedNotifications(selectedNotifications.filter((item) => item !== notification));
        } else {
            setSelectedNotifications([...selectedNotifications, notification]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../../../assets/images/Back.png')} />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 10/10</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Image source={require('../../../assets/images/Exit.png')} />
                </TouchableOpacity>
            </View>

            <Image source={require('../../../assets/images/Notifi.png')} style={styles.image} />

            <Text style={styles.title}>Do You Want to Receive{"\n"} Notifications?</Text>
            <Text style={styles.description}>
                Select the notifications that you want to{"\n"} receive in order to track every coupon.
            </Text>

            <View style={styles.notificationOptions}>
                <Text style={styles.subTitle}>YOU WILL RECEIVE NOTIFICATIONS FOR</Text>
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
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 190,
        height: 213,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000000',

    },
    description: {
        fontSize: 15,
        color: '#989DA3',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
        lineHeight: 25
    },
    notificationOptions: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,

    },
    subTitle: {
        fontSize: 9,
        fontWeight: '900',
        color: '#979DA3',
        marginBottom: 10,
        textAlign: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '90%',
        justifyContent: 'flex-start',
    },
    radioButton: {
        width: 14,
        height: 14,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF6347',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF6347',
    },
    optionText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#989DA3',
        textAlign: 'center',
        marginLeft: 10
    },
    button: {
        backgroundColor: '#F55F44',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 20,
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
    },
    skipText: {
        fontSize: 16,
        color: '#F55F44',
        fontWeight: '800',

    },
});

export default ReceiveNotifi;
