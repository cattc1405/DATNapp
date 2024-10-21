import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../../../assets/colors';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {useNavigation} from '@react-navigation/native';

const BrandDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image
          style={styles.brandImgBgr}
          source={require('../../../../assets/images/DetailStarbuckImg.png')}
        />
        <View style={styles.menuView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../assets/images/icons/whiteBackArrow.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.favoriteIconContainer}>
            <Image
              style={styles.iconMenuView}
              source={require('../../../../assets/images/icons/redheart.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statusRestaurantView}>
          <View style={styles.nameView}>
            <Text style={styles.nameBrandText}>Starbucks</Text>
            <Text style={styles.statusResText}>Open Right Now</Text>
          </View>
          <Text style={styles.locateText}>
            Tillary Street, Brooklyn, New York
          </Text>
          <View style={styles.rateView}>
            <View style={styles.rateStars}>
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
            </View>
            <Text style={styles.grayBoldText}>4.3</Text>
            <Text style={styles.grayBoldText}>(895 views)</Text>
          </View>
          <View style={styles.grayLine}></View>
          <View style={styles.contactView}>
            <TouchableOpacity style={styles.contactMethodView}>
              <View style={styles.contactIconContainer}>
                <Image
                  style={styles.contactIcon}
                  source={require('../../../../assets/images/icons/phoneGreen.png')}
                />
              </View>
              <Text style={styles.contactText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactMethodView}>
              <View style={styles.contactIconContainer}>
                <Image
                  style={styles.contactIcon}
                  source={require('../../../../assets/images/icons/directionGreen.png')}
                />
              </View>
              <Text style={styles.contactText}>Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactMethodView}>
              <View style={styles.contactIconContainer}>
                <Image
                  style={styles.contactIcon}
                  source={require('../../../../assets/images/icons/couponGreen.png')}
                />
              </View>
              <Text style={styles.contactText}>Coupons</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Popular</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainView}>
        <View style={styles.titleAndViewall}>
          <Text style={styles.titleBoldText}>Recent Photos</Text>
          <TouchableOpacity>
            <Text style={styles.viewallText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.photosView}>
          <View style={styles.firstPhotosView}>
            <View style={styles.photoContainer1}>
              <Image
                style={styles.recentPhoto}
                source={require('../../../../assets/images/starbuckPhoto1.png')}
              />
            </View>
            <View style={styles.photoContainer2}>
              <Image
                style={styles.recentPhoto}
                source={require('../../../../assets/images/starbuckPhoto1.png')}
              />
            </View>
          </View>
          <View style={styles.secondPhotosView}>
            <Image
              style={styles.recentPhoto}
              source={require('../../../../assets/images/starbuckPhoto1.png')}
            />
          </View>
          <View style={styles.thirdPhotosView}>
            <View style={styles.photoContainer3}>
              <Image
                style={styles.recentPhoto}
                source={require('../../../../assets/images/starbuckPhoto1.png')}
              />
            </View>
            <View style={styles.photoContainer3}>
              <Image
                style={styles.recentPhoto}
                source={require('../../../../assets/images/starbuckPhoto1.png')}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BrandDetails;

const styles = StyleSheet.create({
  recentPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  photoContainer3: {
    width: '100%',
    height: '46%',
  },
  photoContainer2: {
    width: '100%',
    height: '35%',
  },
  photoContainer1: {
    width: '100%',
    height: '58%',
  },
  thirdPhotosView: {
    width: '22%',
    height: 155,
    justifyContent: 'space-between',
  },
  secondPhotosView: {
    width: '22%',
    height: 150,
  },
  firstPhotosView: {
    width: '45%',
    height: 150,
    justifyContent: 'space-between',
  },
  photosView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mainView: {
    width: '86%',
    marginLeft: '7%',
    marginTop: 180,
    height: 400,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'nunitoSan',
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 15,
    textAlign: 'center',
    paddingVertical: 3,

    textTransform: 'uppercase',
  },
  tagContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    right: -4,
    top: 25,
    backgroundColor: colors.orange1,
  },
  contactText: {
    fontSize: 15,
    fontFamily: 'nunitoSan',
    fontWeight: '700',
    marginTop: 8,
    color: '#000',
    opacity: 0.6,
  },
  contactIcon: {
    width: 19,
    height: 19,
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.whiteBgr,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactMethodView: {
    alignItems: 'center',
  },
  contactView: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  grayLine: {
    // marginHorizontal: ,
    width: '85%',
    marginLeft: '7.5%',
    marginVertical: 12,
    height: 0.1,
    backgroundColor: colors.gray1,
  },
  grayBoldText: {
    fontSize: 13,
    fontFamily: 'nunitoSan',
    fontWeight: '700',
    marginLeft: 5,
    color: colors.gray1,
  },
  rateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 1,
  },
  locateText: {
    fontSize: 13,
    fontFamily: 'nunitoSan',
    fontWeight: '700',
    marginLeft: 24,
    marginVertical: 3,
    color: colors.gray1,
  },
  rateStars: {
    marginLeft: 24,
    flexDirection: 'row',
  },
  statusResText: {
    fontSize: 15,
    fontFamily: 'nunitoSan',
    fontWeight: '700',
    marginLeft: 12,
    color: colors.orange1,
    marginBottom: 2,
  },
  nameBrandText: {
    fontSize: 23,
    fontFamily: 'nunitoSan',
    fontWeight: '700',
    color: '#000',
  },
  nameView: {
    marginLeft: 24,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  favoriteIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  iconMenuView: {
    width: 18,
    height: 18,
  },
  statusRestaurantView: {
    width: '86%',
    height: 220,
    position: 'absolute',
    bottom: -150,
    marginLeft: '7%',
    borderRadius: 20,
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
  brandImgBgr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
