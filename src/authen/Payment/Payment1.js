import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

// Lấy kích thước màn hình để tinh chỉnh cho giao diện linh hoạt hơn
const { width } = Dimensions.get('window');

const Payment1 = (props) => {
    const { navigation } = props;
    const [selectedPayment1, setSelectedPayment1] = useState(null);

    const selectPayment1 = (Payment1) => {
        setSelectedPayment1(Payment1);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}
                >
                    <Image source={require('../../../assets/images/Back.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 1/5</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Image source={require('../../../assets/images/Exit.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Hình ảnh burger */}
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/HamburguerImg.png')} style={styles.image} />
            </View>

            {/* Tiêu đề */}
            <Text style={styles.title}>How Do You Want To Receive Your Order?</Text>
            <Text style={styles.description}>
                Choose one of the following methods to receive your order.</Text>

            {/* Các tùy chọn */}
            <View style={styles.paymentContainer}>
                <TouchableOpacity
                    style={[
                        styles.paymentOption,
                        selectedPayment1 === 'mcdonalds' && styles.selectedPaymentOption
                    ]}
                    onPress={() => selectPayment1('mcdonalds')}
                >
                    <Image source={require('../../../assets/images/McDonalds.png')} style={styles.paymentIcon} />
                    <Text style={styles.paymentText}>Pick Up From Store</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.paymentOption,
                        selectedPayment1 === 'uber' && styles.selectedPaymentOption
                    ]}
                    onPress={() => selectPayment1('uber')}
                >
                    <Image source={require('../../../assets/images/UberImg.png')} style={styles.paymentIcon} />
                    <Text style={styles.paymentText}>Uber Eats</Text>
                </TouchableOpacity>
            </View>

            {/* Nút "Next Step" */}
            <TouchableOpacity
                style={[styles.nextButton, !selectedPayment1 && styles.disabledButton]}
                disabled={!selectedPayment1}
            >
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>

            {/* Nút "Skip" */}
            <TouchableOpacity>
                <Text style={styles.skipText}>Skip this Step</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F8F8',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: width * 0.5, // Điều chỉnh kích thước hình ảnh chiếm 50% chiều rộng màn hình
        height: width * 0.5,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginBottom: 16,
    },
    paymentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    paymentOption: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        width: '45%', // Điều chỉnh chiều rộng của các tùy chọn để vừa màn hình
        elevation: 3,
    },
    selectedPaymentOption: {
        borderColor: '#FF6347',
    },
    paymentIcon: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    paymentText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 14,
        paddingHorizontal: 80, // Điều chỉnh chiều rộng của nút "Next Step"
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 8,
    },
    disabledButton: {
        backgroundColor: '#FFC1B6',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skipText: {
        textAlign: 'center',
        color: 'gray',
        marginBottom: 20,
    },
});

export default Payment1;
