import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Restaurant1 = ({navigation}) => {
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
      name: "Wendy's",
      address: 'Duffield Street, Brooklyn, NY',
      reviews: '491 reviews',
      offers: 'New Offers',
      rating: 4.2,
      image: require('../../../assets/images/Wendy.png'),
    },
    {
      _id: '4',
      name: "Domino's",
      address: 'Concord Street, Brooklyn, NY',
      reviews: '699 reviews',
      offers: 'New Offers',
      rating: 4.3,
      image: require('../../../assets/images/Domino.png'),
    },
    {
      _id: '5',
      name: "McDonald's",
      address: 'Flat Bush Street, Brooklyn, NY',
      reviews: '946 reviews',
      offers: 'Best Offers',
      rating: 4.5,
      image: require('../../../assets/images/Mcdonalds.png'),
    },
  ];

  const renderItem = ({item}) => (
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Image
            style={styles.imageheader}
            source={require('../../../assets/images/BackWhite.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhà hàng gần đó</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CartStack', {screen: 'OrderDetail'});
          }}>
          <Image
            style={styles.iconImage}
            source={require('../../../assets/images/icons/shopping-bag.png')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={restaurantData}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

export default Restaurant1;

const styles = StyleSheet.create({
  iconImage: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F6FB',
  },
  imageheader: {
    width: 24,
    height: 24,
  },
  header: {
    backgroundColor: '#F55F44',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    fontSize: 23,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    padding: 30,
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
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    color: '#ffffff',
    marginRight: 4,
  },
  reviewText: {
    color: '#9D9D9D',
    fontSize: 11,
    fontWeight: '700',
  },
  offerBadge: {
    backgroundColor: '#F55F44',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  offerText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
