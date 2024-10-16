import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Finger = (props) => {
    const { navigation } = props
    return (
        <View style={styles.container}>
            {/* Tiêu đề bước */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('YourPass')}>
                    <Image
                        source={require('../../../assets/images/Back.png')}
                        style={styles.icon} // Cập nhật kích thước biểu tượng
                    />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 7/10</Text>
                <TouchableOpacity>
                    <Image
                        source={require('../../../assets/images/Exit.png')}
                        style={styles.icon} // Cập nhật kích thước biểu tượng
                    />
                </TouchableOpacity>
            </View>

            {/* Hình ảnh chính */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/images/ImgFinger.png')}
                    style={styles.image}
                />
            </View>

            {/* Văn bản mô tả */}
            <Text style={styles.title}>Enable Your Fingerprint</Text>
            <Text style={styles.description}>
                In order to log in into your account in a faster and safer way, add your fingerprint.
            </Text>

            {/* Hình ảnh Fingerprint */}
            <TouchableOpacity>
                <Image
                    source={require('../../../assets/images/Fingerprint.png')}
                    style={styles.fingerprintImage} // Sử dụng kiểu dáng mới cho Fingerprint
                />
            </TouchableOpacity>

            {/* Nút bấm */}
            <TouchableOpacity style={styles.nextButton}
                onPress={() => navigation.navigate('FavRestaurant')}>
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>

            {/* Nút bỏ qua */}
            <TouchableOpacity>
                <Text style={styles.skipText}>Skip this Step</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Sắp xếp các thành phần đều nhau theo chiều dọc
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 40, // Thêm khoảng cách trên dưới cho đều
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    icon: {
        width: 24, // Đặt kích thước biểu tượng
        height: 24,
    },
    stepText: {
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200, // Cập nhật kích thước của hình ảnh để phù hợp hơn
        height: 200,
        resizeMode: 'contain',
    },
    fingerprintImage: {
        width: 100, // Điều chỉnh kích thước Fingerprint để giống với thiết kế
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    nextButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginBottom: 15,
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipText: {
        color: '#FF6F61',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default Finger;
