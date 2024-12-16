import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Payment4 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.stepText}>Step 4/4</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Image source={require('../../../assets/images/Exit.png')} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/Delivery.png')} style={styles.image} />
            </View>
            <Text style={styles.title}>Đơn hàng của bạn đã được đặt thành công!</Text>
            <Text style={styles.description}>
                Đơn hàng của bạn đã hoàn tất thành công. Trong chốc lát, bạn sẽ nhận được thông báo về biên lai mua hàng và bạn có thể theo dõi mọi bước trong đơn hàng của mình.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Product')}>
                <Text style={styles.buttonText}>Finish Order</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        position: 'absolute',
        top: 50,
    },
    stepText: {
        fontSize: 16,
        color: '#888',
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -40 }], // Điều chỉnh để căn giữa chính xác
        fontFamily: 'nunitoSan'
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
        marginVertical: 30,
    },
    image: {
        width: 200,
        height: 200,
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
        marginVertical: 15,
        paddingHorizontal: 30,
        fontFamily: 'nunitoSan'
    },
    button: {
        backgroundColor: '#FF6F61',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginTop: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'nunitoSan'
    },
});

export default Payment4;
