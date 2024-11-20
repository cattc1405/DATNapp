import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import colors from '../../../../assets/colors';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {useNavigation} from '@react-navigation/native';

const BrandDetails = ({route}) => {
  const {brand} = route.params;
  console.log(brand, 'datahere');
  const navigation = useNavigation();

  return (
    <View style={styles.headView}>
      <Image
        style={styles.brandImgBgr}
        source={{uri: brand.image}} // Set the main brand image from brand data
      />
      <View style={styles.menuView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../assets/images/icons/whiteBackArrow.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statusRestaurantView}>
        <View style={styles.nameView}>
          <Text style={styles.nameBrandText}>{brand.name}</Text>
          <Text style={styles.statusResText}>Open</Text>
        </View>
        <Text style={styles.locateText}>{brand.address}</Text>
        <View style={styles.rateView}>
          <View style={styles.rateStars}>
            {/* Render stars based on review count */}
            {Array.from({length: 4}, (_, index) => (
              <Image
                key={index}
                style={styles.starIcon}
                source={require('../../../../assets/images/icons/StarBold.png')}
              />
            ))}
            <Image
              style={styles.starIcon}
              source={require('../../../../assets/images/icons/StarLight.png')}
            />
          </View>
          <Text style={styles.grayBoldText}>
            {(brand.review / 100).toFixed(1)}
          </Text>
          <Text style={styles.grayBoldText}>{brand.review} Viewed</Text>
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
                  source={{uri: brand.gallery[0]}} // Use the first image from the gallery
                />
              </View>
              <View style={styles.photoContainer2}>
                <Image
                  style={styles.recentPhoto}
                  source={{uri: brand.gallery[1]}} // Use the second image from the gallery
                />
              </View>
            </View>
            <View style={styles.secondPhotosView}>
              <Image
                style={styles.recentPhoto}
                source={{uri: brand.gallery[2]}} // Use the third image from the gallery
              />
            </View>
            <View style={styles.thirdPhotosView}>
              {brand.gallery.slice(3).map(
                (
                  image,
                  index, // Render remaining images starting from the fourth
                ) => (
                  <View key={index} style={styles.photoContainer3}>
                    <Image
                      style={styles.recentPhoto}
                      source={{uri: image}} // Render each image from the gallery
                    />
                  </View>
                ),
              )}
            </View>
          </View>
          <View style={styles.titleAndViewall}>
            <Text style={styles.titleBoldText}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.viewallText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingSection}>
            {['Excellent', 'Good', 'Average', 'Below Average', 'Poor'].map(
              (label, index) => (
                <View key={index} style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>{label}</Text>
                  <View style={styles.ratingBarBackground}>
                    <View
                      style={[
                        styles.ratingBar,
                        {width: `${(5 - index) * 20}%`},
                      ]}
                    />
                  </View>
                </View>
              ),
            )}
            <Text style={styles.averageRatingText}>4.3/5</Text>
            <Text style={styles.reviewCountText}>895 reviews</Text>
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
    fontFamily: 'nunitoSan',
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
    marginTop: 20,
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
  ratingSection: {
    marginVertical: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    width: '30%',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  ratingBarBackground: {
    width: '70%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBar: {
    height: '100%',
    backgroundColor: '#F55F44',
  },
  averageRatingText: {
    fontSize: 22,
    color: '#F55F44',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  reviewCountText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
});
