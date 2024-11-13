import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Checkout6 = () => {
    return (
        <View style={styles.container}>
            {/* Phần đầu (Header) */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 2/5</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Text style={styles.closeText}>×</Text>
                </TouchableOpacity>
            </View>

            {/* Hình ảnh minh họa */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require('../../../assets/images/backroundcheckout6.png')} // Thay thế bằng ảnh của bạn
                    style={styles.illustrationImage}
                    resizeMode="contain"
                />
            </View>

            {/* Tiêu đề */}
            <Text style={styles.title}>Which Store Do You Want to Receive Your Order?</Text>
            <Text style={styles.subtitle}>Choose the restaurant where do you want to pick up your order.</Text>

            {/* Thông tin nhà hàng đã chọn */}
            <View style={styles.restaurantCard}>
                <View style={styles.restaurantHeader}>
                    <Text style={styles.restaurantHeaderText}>CHOOSE YOUR RESTAURANT</Text>
                    <TouchableOpacity>
                        <Text style={styles.restaurantCloseText}>×</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.restaurantInfo}>
                    <Image
                        source={require('../../../assets/images/mcdonal.png')} // Thay thế bằng logo của bạn
                        style={styles.restaurantLogo}
                        resizeMode="contain"
                    />
                    <View style={styles.restaurantDetails}>
                        <Text style={styles.restaurantName}>McDonald's</Text>
                        <Text style={styles.restaurantLocation}>Brooklyn NY</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.restaurantRating}>★ ★ ★ ★ ★ </Text>
                            <Text style={{ color: '#888888', marginTop: 6 }}>(960 reviews)</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.changeButton}>
                    <Text style={styles.changeButtonText}>Change Restaurant</Text>
                </TouchableOpacity>
            </View>

            {/* Nút tiếp tục */}
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Checkout6;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    backText: {
        fontSize: 24,
        color: '#000',
        fontFamily: 'nunitoSan'
    },
    stepText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
        fontFamily: 'nunitoSan'
    },
    closeButton: {
        padding: 10,
    },
    closeText: {
        fontSize: 28,
        color: '#000',
        fontFamily: 'nunitoSan'
    },
    illustrationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    illustrationImage: {
        width: 200,
        height: 200, // Tùy chỉnh kích thước hình ảnh
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        color: 'black',
        paddingHorizontal: 25,
        fontFamily: 'nunitoSan'
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 30,
        fontFamily: 'nunitoSan'
    },
    restaurantCard: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        paddingBottom: 40
    },
    restaurantHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    restaurantHeaderText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
    },
    restaurantCloseText: {
        fontSize: 20,
        color: '#888',
    },
    restaurantInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    restaurantLogo: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    restaurantDetails: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
    },
    restaurantLocation: {
        fontSize: 12,
        color: '#888',
    },
    restaurantRating: {
        fontSize: 20,
        color: '#FFCC00',
    },
    changeButton: {
        backgroundColor: '#FF5733',
        paddingVertical: 10,
        alignItems: 'center',
        borderTopLeftRadius: 20, // Bo góc trái trên
        borderBottomRightRadius: 20, // Bo góc phải dưới
        width: 188,
        height: 38,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    changeButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: '#FF5733',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
