import React, {useState} from 'react';
import {Button} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function App() {
  const [count, setCount] = useState(0);

  const offset = useSharedValue(0);

  useAnimatedReaction(
    () => count,
    (_count, _prevCount) => {
      // always null
      console.log(_prevCount);
      if (count % 3) {
        offset.value = withTiming(Math.random());
      }
    },
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: offset.value}],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} testID="view" />
      <Button onPress={() => setCount(prev => prev + 1)} title="+" />
      <Button onPress={() => setCount(prev => prev - 1)} title="-" />
    </>
  );
}

const styles = {
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
};
