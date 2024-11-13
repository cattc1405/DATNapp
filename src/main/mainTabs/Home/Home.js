import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import SlideNav from '../../slidenav/SlideNav';

const Home = () => {
  const navigation = useNavigation();
  const [isSlideNavVisible, setIsSlideNavVisible] = useState(false);

  const toggleSlideNav = () => {
    setIsSlideNavVisible(!isSlideNavVisible);
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={isSlideNavVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleSlideNav}>
        <View style={styles.modalContainer}>
          <SlideNav onClose={toggleSlideNav} />
        </View>
      </Modal>
      <View style={styles.headView}>
        <Image
          style={styles.redFoodBgr}
          source={require('../../../../assets/images/redFoodBgr.png')}
        />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={toggleSlideNav}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../../assets/images/MenuIcon.png')}
            />
          </TouchableOpacity>

          <Image
            style={styles.iconLogo}
            source={require('../../../../assets/images/whiteLogo.png')}
          />

          <TouchableOpacity>
            <Image
              style={styles.iconMenuView}
              source={require('../../../../assets/images/Notification.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.pointView}>
          <View style={styles.titleLine}>
            <Text style={styles.currentText}>Current Points</Text>
            <View style={styles.youthereView}>
              <Text style={styles.youthereText}>You are almost there!</Text>
            </View>
          </View>

          <View style={styles.treasureView}>
            <Image
              style={styles.diggerImg}
              source={require('../../../../assets/images/TreasureDigger.png')}
            />
            <View style={styles.pointTextView}>
              <Text style={styles.pointText}>
                Currently you have 125 points,
              </Text>
              <Text style={styles.pointText}>
                keep going to win amazing rewards!
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.mainView}>
        <View style={styles.titleAndViewall}>
          <Text style={styles.titleBoldText}>What's in Today?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('WhatsInToday')}>
            <Text style={styles.viewallText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* scrollview */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ImageBackground
            style={styles.itemTodayView}
            source={require('../../../../assets/images/StarbucksOffer.png')}
            imageStyle={{borderRadius: 15}}>
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
            imageStyle={{borderRadius: 15}}>
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
            <Text style={styles.brandText}>MC DONALD'S</Text>
            <Text style={styles.describeText}>
              2 McMenu Texas, CBO or Big Tasty For only 10.99$*
            </Text>
          </ImageBackground>

          <ImageBackground
            style={styles.itemTodayView}
            source={require('../../../../assets/images/McDonaldsOffer.png')}
            imageStyle={{borderRadius: 15}}>
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
            <Text style={styles.brandText}>MC DONALD'S</Text>
            <Text style={styles.describeText}>
              2 McMenu Texas, CBO or Big Tasty For only 10.99$*
            </Text>
          </ImageBackground>
        </ScrollView>

        <View style={styles.titleAndViewall}>
          <Text style={styles.titleBoldText}>Popular Restaurants Nearby</Text>
          <TouchableOpacity>
            <Text style={styles.viewallText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.popularView}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RestaurantStack', {screen: 'BrandDetails'})
            }>
            <ImageBackground
              style={styles.itemPopularView}
              source={require('../../../../assets/images/Starbucksimg.png')}
              imageStyle={{borderRadius: 15}}>
              <View style={styles.tagBrand}>
                <View style={styles.bestTag}>
                  <Text style={styles.bestText}>BEST OFFER</Text>
                </View>
                <Text style={styles.nameText}>McDonald's</Text>
                <View style={styles.starView}>
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarLight.png')}
                  />
                  <Text style={styles.thinText}>(694) | 0.3km away</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RestaurantStack', {screen: 'BrandDetails'})
            }>
            <ImageBackground
              style={styles.itemPopularView}
              source={require('../../../../assets/images/Starbucksimg.png')}
              imageStyle={{borderRadius: 15}}>
              <View style={styles.tagBrand}>
                <View style={styles.bestTag}>
                  <Text style={styles.bestText}>BEST OFFER</Text>
                </View>
                <Text style={styles.nameText}>McDonald's</Text>
                <View style={styles.starView}>
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarBold.png')}
                  />
                  <Image
                    style={styles.starIcon}
                    source={require('../../../../assets/images/icons/StarLight.png')}
                  />
                  <Text style={styles.thinText}>(694) | 0.3km away</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popularView: {
    height: 200,
  },
  thinText: {
    paddingLeft: 3,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'nunitoSan',
    color: '#9D9D9D',
  },
  starView: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 3,
  },
  nameText: {
    color: 'black',
    marginTop: 12,
    marginLeft: 20,
    fontFamily: 'nunitoSan',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bestText: {
    color: 'white',
    padding: 7,
    paddingHorizontal: 12,
    fontSize: 10,
    fontFamily: 'nunitoSan',
    fontWeight: 'bold',
  },
  bestTag: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    right: -4,
    top: 8,
    backgroundColor: '#F55F44',
  },
  tagBrand: {
    width: 230,
    height: 70,
    borderRadius: 10,
    left: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -20,
  },
  itemPopularView: {
    marginLeft: 20,
    width: 250,
    height: 160,
  },
  describeText: {
    fontSize: 16,
    width: '45%',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: -5,
    fontFamily: 'nunitoSan',
  },
  brandText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    margin: 15,
    fontFamily: 'nunitoSan',
  },
  productImg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '55%',
    height: '100%',
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
    width: 300,
    height: 125,
    marginLeft: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  viewallText: {
    color: '#F55F44',
    fontSize: 15,
    fontWeight: '600',
  },
  titleBoldText: {
    fontSize: 20,
    fontFamily: 'nunitoSan',
    color: 'black',
    fontWeight: 'bold',
  },
  titleAndViewall: {
    marginLeft: '7%',
    width: '86%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mainView: {
    marginTop: 110,
    backgroundColor: '#F7F6FB',
  },
  pointText: {
    fontSize: 13,
    fontFamily: 'nunitoSan',
    fontWeight: '600',
  },
  pointTextView: {
    marginLeft: 10,
  },
  treasureView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    height: 70,
    marginTop: 10,
    marginLeft: '10%',
  },
  diggerImg: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  youthereText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12.5,
    padding: 10,
    fontFamily: 'nunitoSan',
  },
  youthereView: {
    position: 'absolute',
    borderTopLeftRadius: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    right: 0,
    backgroundColor: '#F55F44',
  },
  currentText: {
    fontWeight: '700',
    color: '#000',
    fontSize: 15,
    paddingLeft: '10%',
    fontFamily: 'nunitoSan',
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  pointView: {
    width: '86%',
    height: 180,
    position: 'absolute',
    bottom: -110,
    marginLeft: '7%',
    borderRadius: 15,
    backgroundColor: '#fff',
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
    height: '30%',
    backgroundColor: 'blue',
  },
  redFoodBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
