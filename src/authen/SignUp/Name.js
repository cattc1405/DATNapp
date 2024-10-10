import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Name = (props) => {
    const {navigation} = props
    return (
        <View style={styles.container}>
            {/* Tiêu đề bước */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/Back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 1/10</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/Exit.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.illustrationContainer}>
                <Image
                    source={require('../../../assets/images/ImgPeople.png')}
                    style={styles.illustrationImage}
                />
            </View>
            <Text style={styles.title}>What is Your Name?</Text>
            <Text style={styles.description}>
                In order to help us identify you, we need to know your real name.
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>FULL NAME</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Example: John Smith"
                    placeholderTextColor="#999"
                />
                <Text style={styles.inputHint}>Your name must contain</Text>
                <Text style={styles.inputRequirement}>At least 5 characters</Text>
            </View>

            {/* Nút tiếp tục */}
            <TouchableOpacity style={styles.nextButton}
            onPress={() => navigation.navigate('Gender')}>
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F7F6FB',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    stepText: {
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',
    },
    illustrationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    illustrationImage: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
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
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        alignItems: 'flex-start', // Đặt nội dung bên trái
    },
    inputLabel: {
        fontSize: 12,
        color: '#FF6F61',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        marginBottom: 8,
    },
    inputHint: {
        fontSize: 12,
        color: '#888',
    },
    inputRequirement: {
        fontSize: 12,
        color: '#FF6F61',
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 30,
        marginTop: 20,
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Name;
