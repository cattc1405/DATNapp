import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const FavRestaurant = (props) => {
    const { navigation } = props;
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const selectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Image source={require('../../../assets/images/Back.png')} />
                </TouchableOpacity>
                <Text style={styles.stepText}>Step 9/10</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Image source={require('../../../assets/images/Exit.png')} />
                </TouchableOpacity>
            </View>

            {/* Restaurant Image */}
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/Restaurant.png')} style={styles.image} />
            </View>

            {/* Text below Restaurant Image */}
            <Text style={styles.chooseText}>CHOOSE YOUR FAVORITE RESTAURANTS</Text>
            <Text style={styles.descriptionText}>
                To be the first to receive the news and {"\n"}rewards, choose your favorite restaurants.
            </Text>

            {/* Icon selection container */}
            <View style={styles.selectionContainer}>
                <View style={styles.iconsContainer}>
                    <Text style={styles.text1}>
                        Choose Your Favorite Restaurants
                    </Text>
                    <View style={styles.row}>

                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'starbucks' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('starbucks')}
                        >
                            <Image source={require('../../../assets/images/Starbucks.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'domino' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('domino')}
                        >
                            <Image source={require('../../../assets/images/Domino.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'subway' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('subway')}
                        >
                            <Image source={require('../../../assets/images/Subway.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'mcdonalds' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('mcdonalds')}
                        >
                            <Image source={require('../../../assets/images/Mcdonalds.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'wendy' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('wendy')}
                        >
                            <Image source={require('../../../assets/images/Wendy.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'buffallo' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('buffallo')}
                        >
                            <Image source={require('../../../assets/images/Buffallo.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'arby' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('arby')}
                        >
                            <Image source={require('../../../assets/images/Arby.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                selectedRestaurant === 'burgerKing' && styles.selectedIcon,
                            ]}
                            onPress={() => selectRestaurant('burgerKing')}
                        >
                            <Image source={require('../../../assets/images/Burguer.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('NextPage')}>
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
        marginBottom: 5,
    },
    backButton: {
        padding: 10,
    },
    text1: {
        fontSize: 9,
        fontWeight: '900',
        color: '#989DA3',
        marginBottom: 10,
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
    chooseText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 15,
        color: '#989DA3',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
        lineHeight: 25,
        marginTop: 15,
    },
    selectionContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 20,
    },
    iconButton: {
        marginHorizontal: 5,
        marginVertical: 1,
    },
    icon: {
        width: 50,
        height: 50,
    },
    selectedIcon: {
        borderWidth: 2,
        borderColor: '#FF6347',
        borderRadius: 10,
    },
    nextButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 25
    },
    nextButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '800',
    },
    skipText: {
        textAlign: 'center',
        color: '#F55F44',
        fontSize: 14,
        fontWeight: '800',
    },
});

export default FavRestaurant;
