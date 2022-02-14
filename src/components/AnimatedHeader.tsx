import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
});

type AnimatedHeaderProps = {
  animatedHeader: () => React.ReactElement;
  animatedContainerStyles: AnimatedStyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
};

function AnimatedHeader({
  animatedHeader,
  animatedContainerStyles,
  containerStyles,
}: AnimatedHeaderProps) {
  return (
    <Animated.View
      style={[styles.headerContainer, animatedContainerStyles, containerStyles]}
    >
      {animatedHeader()}
    </Animated.View>
  );
}

export default AnimatedHeader;
