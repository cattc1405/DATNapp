import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Payment5 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.stepText}>Step 5/5</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Image source={require('../../../assets/images/Exit.png')} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/Success.png')} style={styles.image} />
            </View>
            <Text style={styles.title}>Đơn hàng của bạn đã được đặt thành công!</Text>
            <Text style={styles.description}>
            Đơn hàng của bạn đã hoàn tất thành công. Trong chốc lát, bạn sẽ nhận được thông báo có biên lai mua hàng.
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Hoàn thành đơn hàng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        position: 'absolute',
        top: 30,
        paddingHorizontal: 20,
    },
    stepText: {
        fontSize: 16,
        color: '#888',
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
    },
    closeIcon: {
        width: 24,
        height: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#3E7CB1',
        padding: 10,
    },
    image: {
        width: 180,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        fontFamily: 'nunitoSan'
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 30,
        fontFamily: 'nunitoSan'
    },
    button: {
        backgroundColor: '#FF6F61',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'nunitoSan'
    },
});

export default Payment5;
