import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

const Restaurant1 = ({ navigation }) => {
    // Dữ liệu mẫu cho danh sách nhà hàng
    const restaurantData = [
        {
            _id: '1',
            name: 'Starbucks',
            address: 'Tillary Street, Brooklyn, NY',
            reviews: '895 reviews',
            offers: 'Best Offers',
            rating: 4.5,
            image: require('../../../assets/images/Starbucks.png'),
        },
        {
            _id: '2',
            name: 'Burger King',
            address: 'Johnston Street, Brooklyn, NY',
            reviews: '548 reviews',
            offers: 'Best Offers',
            rating: 4.0,
            image: require('../../../assets/images/Burguer.png'),
        },
        {
            _id: '3',
            name: 'Wendy\'s',
            address: 'Duffield Street, Brooklyn, NY',
            reviews: '491 reviews',
            offers: 'New Offers',
            rating: 4.2,
            image: require('../../../assets/images/Wendy.png'),
        },
        {
            _id: '4',
            name: 'Domino\'s',
            address: 'Concord Street, Brooklyn, NY',
            reviews: '699 reviews',
            offers: 'New Offers',
            rating: 4.3,
            image: require('../../../assets/images/Domino.png'),
        },
        {
            _id: '5',
            name: 'McDonald\'s',
            address: 'Flat Bush Street, Brooklyn, NY',
            reviews: '946 reviews',
            offers: 'Best Offers',
            rating: 4.5,
            image: require('../../../assets/images/Mcdonalds.png'),
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.restaurantCard}>
            <Image source={item.image} style={styles.logo} />
            <View style={styles.infoContainer}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantAddress}>{item.address}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                    <Text style={styles.reviewText}>({item.reviews})</Text>
                </View>
            </View>
            <View style={styles.offerBadge}>
                <Text style={styles.offerText}>{item.offers}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Nút Back */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Image source={require('../../../assets/images/BackWhite.png')} />
                </TouchableOpacity>

                {/* Tiêu đề */}
                <Text style={styles.headerTitle}>Nearby Restaurants</Text>

                {/* Nút Profile */}
                <TouchableOpacity style={styles.headerButton}>
                    <Image source={require('../../../assets/images/Filter.png')} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={restaurantData}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.scrollContainer} // giống ScrollView của bạn
            />
        </View>
    );
};

export default Restaurant1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#ff5a5f',
        padding: 16,
        flexDirection: 'row', // Thay đổi thành row để căn chỉnh theo hàng ngang
        alignItems: 'center',
        justifyContent: 'space-between', // Căn đều các phần tử
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerButton: {
        padding: 8,
    },
    scrollContainer: {
        padding: 16,
    },
    restaurantCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    restaurantAddress: {
        color: '#888',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingStars: {
        color: '#ffcc00',
        marginRight: 4,
    },
    reviewText: {
        color: '#888',
    },
    offerBadge: {
        backgroundColor: '#ff5a5f',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    offerText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
