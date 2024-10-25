import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Name = (props) => {
    const { navigation } = props;
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <View style={styles.container}>
            {/* Step Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/Back.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 1/10</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/Exit.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>


            <View style={styles.illustrationContainer}>
                <Image source={require('../../../assets/images/ImgPeople.png')} style={styles.illustrationImage} />
            </View>
            <Text style={styles.title}>What is Your Name?</Text>
            <Text style={styles.description}>In order to help us identify you, we need{"\n"} to know your real name.</Text>


            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>FULL NAME</Text>
                <TextInput style={styles.input} placeholder="Example: John Smith" placeholderTextColor="#989DA3" />

                <Text style={styles.inputHint}>YOU NAME MUST CONTAIN</Text>

                <View style={styles.requirementContainer}>
                    <TouchableOpacity style={[styles.checkbox, isChecked && styles.checkboxChecked]} onPress={toggleCheckbox} />
                    <Text style={styles.inputRequirement}>At least 5 characters</Text>
                </View>
            </View>

            {/* Next Step Button */}
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Gender')}>
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
        marginBottom: 50,
    },
    illustrationImage: {
        width: 266,
        height: 206,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        fontSize: 15,
        color: '#989DA3',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 25,
    },
    inputContainer: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,

    },
    inputLabel: {
        fontSize: 12,
        color: '#FF6F61',
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 25,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        fontSize: 12,
        fontWeight: '700',
        paddingLeft:25,
        
    },
    inputHint: {
        fontSize: 9,
        color: '#979DA3',
        fontWeight: '900',
        marginLeft: 30,

    },
    requirementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    checkbox: {
        width: 14,
        height: 14,
        borderWidth: 1,
        color: '#EEEEEE',
        borderRadius: 20,
        marginLeft: 30,
        marginTop: 5,

    },
    checkboxChecked: {
        backgroundColor: '#F55F44', // Color when checkbox is selected
        borderColor: '#F55F44',
    },
    inputRequirement: {
        fontSize: 11,
        color: '#989DA3',
        fontWeight: '600',
        marginLeft: 10,
        marginTop: 5,
    },
    nextButton: {
        backgroundColor: '#F55F44',
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 30,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        textAlign: 'center',
    },
});

export default Name;
