import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const AddressScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image
                        source={require('../../../assets/images/backArrow.png')} // Đường dẫn tới icon mũi tên quay lại
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 2/4</Text>
                <Image
                    source={require('../../../assets/images/closeArrow.png')} // Đường dẫn tới icon dấu X
                    style={styles.closeIcon}
                />
            </View>

            {/* Image */}
            <Image
                source={require('../../../assets/images/backroundHome.png')} // Đường dẫn tới hình ảnh tòa nhà
                style={styles.buildingImage}
            />

            {/* Text */}
            <Text style={styles.questionText}>Which Address Do You Want to Receive Your Order?</Text>
            <Text style={styles.subText}>
                Choose the address where you want your order to be delivered.
            </Text>

            {/* Address Box */}
            <View style={styles.addressBox}>
                <Text style={styles.addressHeader}>CHOOSE YOUR ADDRESS</Text>
                <View style={styles.addressContent}>
                    <Text style={styles.addressTitle}>Brooklyn</Text>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/images/redcircle.png')} // Đường dẫn tới icon dấu X
                            style={styles.deleteIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.addressDetails}>Flat Bush Street</Text>
                <Text style={styles.addressDetails}>Zip Code - 112</Text>
                <TouchableOpacity style={styles.changeAddressButton}>
                    <Text style={styles.changeAddressButtonText}>Change Address</Text>
                </TouchableOpacity>
            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start', // Để các phần tử nằm ở trên cùng
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    stepText: {
        fontSize: 16,
        color: '#999',
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    buildingImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    addressBox: {
        width: '100%',
        backgroundColor: '#fff', // Đặt nền trắng
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000', // Đổ bóng
        marginTop: 30,
        shadowOffset: {
        width: 0,
        height: 1,

        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 20,
    },
    addressHeader: {
        fontSize: 14,
        color: '#999',
        marginBottom: 10,
    },
    addressContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteIcon: {
        width: 20,
        height: 20,
        marginTop: -40
    },
    addressDetails: {
        fontSize: 14,
        color: '#666',
    },
    changeAddressButton: {
        marginTop: 10,
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute', // Đặt nút ở vị trí tương đối
        bottom: 10,
        right: 10,
    },
    changeAddressButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    nextButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginTop: 40   
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddressScreen;
