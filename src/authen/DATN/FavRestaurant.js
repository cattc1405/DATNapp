import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FavRestaurant = () => {
    // State lưu trữ cửa hàng được chọn
    const [selectedRestaurant, setselectedRestaurant] = useState(null);

    // Hàm để chọn cửa hàng
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
                <Text style={styles.stepText}>Step 9/10</Text>
                <TouchableOpacity style={styles.closeButton}>
                    <Image
                        source={require('../../../assets/images/Exit.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/Restaurant.png')} style={styles.image} />
            </View>
            <Text style={styles.title}>Choose Your Favorite Restaurants</Text>
            <Text style={styles.description}>
                To be the first to receive the news and rewards, choose your favorite restaurants.
            </Text>
            <View style={styles.iconsContainer}>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'starbucks'
                    ]}
                    onPress={() => selectRestaurant('starbucks')}
                >
                    <Image source={require('../../../assets/images/Starbucks.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'domino' && styles.selectedOption
                    ]}
                    onPress={() => selectRestaurant('domino')}
                >
                    <Image source={require('../../../assets/images/Domino.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'subway'
                    ]}
                    onPress={() => selectRestaurant('subway')}
                >
                    <Image source={require('../../../assets/images/Subway.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'mcDonalds'
                    ]}
                    onPress={() => selectRestaurant('mcDonalds')}
                >
                    <Image source={require('../../../assets/images/Mcdonalds.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer1}>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'wendy'
                    ]}
                    onPress={() => selectRestaurant('wendy')}
                >
                    <Image source={require('../../../assets/images/Wendy.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'buffallo' && styles.selectedOption
                    ]}
                    onPress={() => selectRestaurant('bufafllo')}
                >
                    <Image source={require('../../../assets/images/Buffallo.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'arby'
                    ]}
                    onPress={() => selectRestaurant('arby')}
                >
                    <Image source={require('../../../assets/images/Arby.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        selectedRestaurant === 'burguer'
                    ]}
                    onPress={() => selectRestaurant('burguer')}
                >
                    <Image source={require('../../../assets/images/Burguer.png')} />
                </TouchableOpacity>
            </View>



            <TouchableOpacity style={styles.nextButton}>
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
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    arrow: {
        fontSize: 20,
    },
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
    },
    closeText: {
        fontSize: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,

    },
    image: {
        width: 205,
        height: 164,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5,
        marginHorizontal: 60
    },
    iconsContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        marginHorizontal: 60
    },
    icon: {
        width: 50,
        height: 50,
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
        fontSize: 18,
    },
    skipText: {
        textAlign: 'center',
        color: 'gray',
    },
});


export default FavRestaurant