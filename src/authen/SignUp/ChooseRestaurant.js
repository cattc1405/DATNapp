import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const ChooseRestaurant = (props) => {
    const { navigation } = props;
    const [selectedRestaurant, setselectedRestaurant] = useState(null);

    const selectRestaurant = (restaurant) => {
        setselectedRestaurant(restaurant);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Image source={require('../../../assets/images/Back.png')} />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 8/10</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Image source={require('../../../assets/images/Exit.png')} />
                </TouchableOpacity>
            </View>

            {/* Main Image */}
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/IllustrationSync.png')} style={styles.image} />
            </View>

            {/* Title and Description */}
            <Text style={styles.title}>Sync All Your Accounts</Text>
            <Text style={styles.description}>
                Sync all of your accounts and don't lose{"\n"}any important data.
            </Text>

            {/* Email Input and Icons */}
            <View style={styles.emailContainer}>

                {/* New Text for Selecting App */}
                <Text style={styles.selectAppText}>SELECT APP TO SYNC</Text>

                {/* Restaurant Icons */}
                <View style={styles.iconsContainer}>
                    <TouchableOpacity
                        style={[
                            selectedRestaurant === 'starbucks'
                        ]}
                        onPress={() => selectRestaurant('starbucks')}
                    >
                        <Image source={require('../../../assets/images/Starbucks.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            selectedRestaurant === 'subway'
                        ]}
                        onPress={() => selectRestaurant('subway')}
                    >
                        <Image source={require('../../../assets/images/Subway.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            selectedRestaurant === 'domino'
                        ]}
                        onPress={() => selectRestaurant('domino')}
                    >
                        <Image source={require('../../../assets/images/Domino.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            selectedRestaurant === 'mcdonalds'
                        ]}
                        onPress={() => selectRestaurant('mcdonalds')}
                    >
                        <Image source={require('../../../assets/images/Mcdonalds.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {/* Email Input Section */}
                <Text style={styles.emailLabel}>EMAIL ASSOCIATED WITH THE APPS</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder="Example: john.smith@gmail.com"
                    placeholderTextColor="#999"
                />
            </View>

            {/* Next Button */}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('NextPage')}>
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.skipText}>Skip this Step</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F6FB',
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
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    closeButton: {
        padding: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
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
        marginVertical: 10,
        color: '#333',
    },
    description: {
        fontSize: 15,
        textAlign: 'center',
        color: '#989DA3',
        marginBottom: 30,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

    },
    icon: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    emailContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,

    },
    emailLabel: {
        fontSize: 9,
        color: '#979DA3',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 45,
    },
    emailInput: {
        height: 40,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 45,
        backgroundColor: '#FFF',
        fontSize: 12,
        color: '#979DA3',

    },
    selectAppText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#979DA3',
        marginLeft: 45,
    },
    nextButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 800,
    },
    skipText: {
        textAlign: 'center',
        color: '#F55F44',
        fontSize: 14,
        fontWeight: '800',
    },
});

export default ChooseRestaurant;
