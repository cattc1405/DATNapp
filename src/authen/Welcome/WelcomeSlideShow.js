import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../../assets/images/welcome1pic.jpg'),
    title: 'Welcome!',
    description: [
      'Find your favorite restaurants and win',
      'points and amazing rewards for each purchase.',
    ],
  },
  {
    id: '2',
    image: require('../../../assets/images/welcome2pic.jpg'),
    title: 'Collect Points in a Single App!',
    description: [
      'Collect points with each purchase and',
      'exchange them for exclusive rewards!',
    ],
  },
  {
    id: '3',
    image: require('../../../assets/images/welcome3pic.jpg'),
    title: 'Exclusive Offers and Rewards!',
    description: [
      'We offer amazing and exclusive rewards',
      'and coupons that you can only find here!',
    ],
  },
];
import {useNavigation} from '@react-navigation/native';
const WelcomeSlideShow = ({onGetStarted}) => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const handleScroll = event => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const renderSlide = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.bgrImg} source={item.image} />
        <View style={styles.contentWelcome}>
          <View style={styles.threeLineView}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.lineNot, i === index && styles.lineNavi]}
              />
            ))}
          </View>
          <Text style={styles.welcomeText}>{item.title}</Text>
          {item.description.map((line, i) => (
            <Text key={i} style={styles.decribeText}>
              {line}
            </Text>
          ))}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              if (index < slides.length - 1) {
                flatListRef.current.scrollToIndex({index: index + 1});
              } else {
                navigation.navigate('Login');
              }
            }}>
            <Text style={styles.continueText}>
              {index < slides.length - 1 ? 'Continue' : 'Get Started!'}
            </Text>
          </TouchableOpacity>
          {index < slides.length - 1 && (
            <Text style={styles.skipText}>Skip</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={slides}
      renderItem={renderSlide}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      ref={flatListRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    />
  );
};

export default WelcomeSlideShow;

const styles = StyleSheet.create({
  skipText: {
    fontFamily: 'nunitoSan',
    color: '#F55F44',
    fontSize: 15,
    marginTop: '3.5%',
    fontWeight: '700',
  },
  btnContainer: {
    width: '65%',
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F55F44',
  },
  continueText: {
    fontFamily: 'nunitoSan',
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  btnView: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
  },
  decribeText: {
    color: '#989DA3',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'nunitoSan',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '7%',
    marginBottom: '2%',
    fontFamily: 'nunitoSan',
  },
  lineNot: {
    width: '7%',
    height: '100%',
    borderRadius: 10,
    marginHorizontal: '1.6%',
    backgroundColor: '#E1E0E0',
  },
  lineNavi: {
    backgroundColor: '#F55F44',
  },
  threeLineView: {
    flexDirection: 'row',
    marginTop: '10%',
    height: '1.6%',
  },
  contentWelcome: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },
  bgrImg: {
    width: '100%',
    height: '55%',
  },
  slide: {
    width,
    backgroundColor: '#F7F6FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
