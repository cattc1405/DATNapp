import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const WhatsInToday = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image
          style={styles.redFoodBgr}
          source={require('../../../../assets/images/redFoodBgr.png')}
        />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../../assets/images/icons/FilterIcon.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleBoldText}>What's in Today?</Text>
      </View>
      <ImageBackground
        style={styles.itemTodayView}
        source={require('../../../../assets/images/StarbucksOffer.png')}
        imageStyle={{ borderRadius: 15 }}>
        <Image
          style={styles.productImg}
          source={require('../../../../assets/images/coffeeStarbucks.png')}
        />
        <View style={styles.tagView}>
          <Image
            style={styles.logo}
            source={require('../../../../assets/images/icons/StarbucksLogo.png')}
          />
          <Text style={styles.tagText}>NEW</Text>
        </View>
        <Text style={styles.brandText}>STARBUCKS</Text>
        <Text style={styles.describeText}>
          Buy 2 coffees and get 1 for free!
        </Text>
      </ImageBackground>

      <ImageBackground
        style={styles.itemTodayView}
        source={require('../../../../assets/images/McDonaldsOffer.png')}
        imageStyle={{ borderRadius: 15 }}>
        <Image
          style={styles.productImg}
          source={require('../../../../assets/images/burgurMc.png')}
        />
        <View style={styles.tagView}>
          <Image
            style={styles.logo}
            source={require('../../../../assets/images/icons/McDonaldsLogo.png')}
          />
          <Text style={styles.tagText}>NEW</Text>
        </View>
        <Text style={styles.brandText}>McDonald'S</Text>
        <Text style={styles.describeText}>
          2 McMenu Texas, CBO or Big Tasty For only 10.99$*
        </Text>
      </ImageBackground>

      <ImageBackground
        style={styles.itemTodayView}
        source={require('../../../../assets/images/PizzaOffer.png')}
        imageStyle={{ borderRadius: 15 }}>
        <Image
          style={styles.productImg}
          source={require('../../../../assets/images/PizzaDomino.png')}
        />
        <View style={styles.tagView}>
          <Image
            style={styles.logo}
            source={require('../../../../assets/images/icons/DominoLogo.png')}
          />
          <Text style={styles.tagText}>BEST DEAL</Text>
        </View>
        <Text style={styles.brandText}>Domino's</Text>
        <Text style={styles.describeText}>
          Buy 3 pizzas and
          get 1 for free!
        </Text>
      </ImageBackground>
    </View>
  );
};

export default WhatsInToday;

const styles = StyleSheet.create({
  describeText: {
    fontSize: 17,
    width: '42%',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: -15,
    fontFamily: 'nunitoSan',
  },
  brandText: {
    color: 'white',
    fontSize: 27,
    fontWeight: '700',
    margin: 25,
    fontFamily: 'nunitoSan',
  },
  productImg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '55%',
    height: '80%',
    resizeMode: 'contain',
  },
  logo: {
    width: 20,
    marginLeft: 20,
    marginRight: 10,
    height: 20,
  },
  tagText: {
    fontSize: 13,
    marginRight: 20,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'nunitoSan'
  },
  tagView: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    right: -5,
    top: 20,
    height: 30,
    backgroundColor: 'rgb(67, 212, 101)',
  },
  itemTodayView: {
    width: 340,
    height: 145,
    marginLeft: '10%',
    borderRadius: 15,
    marginTop: '3%'
  },
  titleBoldText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '3%'

  },
  iconLogo: {
    width: 200,
    height: 50,
  },
  menuView: {
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '18%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  headView: {
    width: '100%',
    height: '23%',
    backgroundColor: 'blue',
    marginBottom: '10%'
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
