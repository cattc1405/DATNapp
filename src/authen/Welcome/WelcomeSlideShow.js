import React, {useRef, useState} from 'react';
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
    title: 'Chào mừng!',
    description: [
      'Tìm nhà hàng yêu thích của bạn và nhận',
      'điểm thưởng cùng những phần quà hấp dẫn ',
    ],
  },
  {
    id: '2',
    image: require('../../../assets/images/welcome2pic.jpg'),
    title: 'Thu thập điểm trong một ứng dụng!',
    description: [
      'Thu thập điểm với mỗi lần mua sắm và',
      'đổi chúng lấy những phần quà',
      'độc quyền!',
    ],
  },
  {
    id: '3',
    image: require('../../../assets/images/welcome3pic.jpg'),
    title: 'Ưu đãi và phần thưởng độc quyền!',
    description: [
      'Chúng tôi mang đến những phần thưởng và ưu đãi',
      'độc quyền mà bạn chỉ có thể tìm thấy ',
      'tại đây!',
    ],
  },
];
import {useNavigation} from '@react-navigation/native';
const WelcomeSlideShow = ({onGetStarted}) => {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const toLogin = () => {
    navigation.navigate('Login');
}
  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    setCurrentIndex(newIndex);
    setCurrentItem(slides[newIndex]);
  };

  const renderImage = item => (
    <Image style={styles.bgrImg} source={item.image} />
  );

  const renderContent = (item, index) => (
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
  );

  const renderSlide = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.bgrImg} source={item.image} />
        <View style={styles.contentWelcome}>
          
          <Text style={styles.welcomeText}>{item.title}</Text>
          {item.description.map((line, i) => (
            <Text key={i} style={styles.decribeText}>
              {line}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View>
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
      <View style={styles.threeLineView}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.lineNot, i === currentIndex && styles.lineNavi]}
          />
        ))}
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            if (currentIndex < slides.length - 1) {
              flatListRef.current.scrollToIndex({index: currentIndex + 1});
            } else {
              navigation.navigate('Login');
            }
          }}>
          <Text style={styles.continueText}>
            {currentIndex < slides.length - 1 ? 'Continue' : 'Bắt đầu ngay!'}
          </Text>
        </TouchableOpacity>
        {currentIndex < slides.length - 1 && (
          <Text style={styles.skipText} onPress={toLogin}>Skip</Text>
        )}
      </View>
    </View>
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
    fontSize: 15,
    lineHeight: 28,
    // fontFamily: 'nunitoSan',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 50,
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
    height: '0.6%',
    width: '100%',
    justifyContent:'center',
    backgroundColor: '#F7F6FB',
    position: 'absolute',
top: 520
  },
  contentWelcome: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },
  bgrImg: {
    width: '100%',
    height: 500,
  },
  slide: {
    width,
    backgroundColor: '#F7F6FB',
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
