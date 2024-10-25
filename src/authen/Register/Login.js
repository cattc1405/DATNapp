import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

const LoginScreen = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Back Button (optional) */}
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/images/logo.png')} // Make sure to use the correct path for the logo
                    style={styles.logo}
                />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.loginText}>Login</Text>

                {/* E-mail Input */}
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your email or phone"
                    placeholderTextColor="#ccc"
                />

                {/* Password Input with Visibility Toggle */}
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor="#ccc"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Text>{passwordVisible ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>

                {/* Sign Up Section */}
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Media Login Options */}
                <View style={styles.signInContainer}>
                    <View style={styles.horizontalLine} />
                    <Text style={styles.signInWithText}>Sign in with</Text>
                    <View style={styles.horizontalLine} />
                </View>
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={require('../../../assets/images/logofbb.png')}
                            style={styles.socialIcon}
                        />
                        <Text style={styles.socialButtonText}>FACEBOOK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={require('../../../assets/images/logg.png')}
                            style={styles.socialIcon}
                        />
                        <Text style={styles.socialButtonText}>GOOGLE    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButtonText: {
        fontSize: 30,
        color: '#333',
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 350,
        height: 100, // Adjust according to your logo's size
        resizeMode: 'contain',
    },
    formContainer: {
        width: '90%',
        padding: 20,
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily:'nunitoSan'
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        width: '100%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        padding: 10,
        top: 5
    },
    forgotPassword: {
        color: '#ff7f50',
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'right',
    },
    loginButton: {
        backgroundColor: '#ff7f50',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    signupText: {
        fontSize: 14,
        color: '#333',
    },
    signupLink: {
        fontSize: 14,
        color: '#ff7f50',
        fontWeight: 'bold',
    },
    signInWithText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 14,
        color: '#333',
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    horizontalLine: {
        flex: 1, // Để đường kẻ chiếm không gian còn lại
        height: 1, // Độ cao của đường kẻ
        backgroundColor: '#ccc', // Màu xám nhẹ cho đường kẻ
        marginHorizontal: 10, // Khoảng cách giữa đường kẻ và chữ
    },
    signInWithText: {
        fontSize: 14,
        color: '#666', // Màu xám đậm hơn cho chữ
        fontWeight: '500', // Độ dày của chữ
    },
});

export default LoginScreen;
