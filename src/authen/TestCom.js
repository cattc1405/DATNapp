import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const TestCom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const height = useSharedValue(0); // Initialize the animated value

  const toggle = () => {
    height.value = withTiming(isOpen ? 0 : 100, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    setIsOpen(!isOpen);
  };

  // Define the animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: 'hidden', // This is important to hide overflowing content
    };
  });

  return (
    <View>
      <Button title="Toggle" onPress={toggle} />
      <Animated.View style={[animatedStyle]}>
        <Text>aa</Text>
      </Animated.View>
    </View>
  );
};

export default TestCom;

const styles = StyleSheet.create({});
