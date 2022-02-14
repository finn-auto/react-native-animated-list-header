import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import useAnimatedScrollHeader from '../hooks/useAnimatedScrollHeader';
import type { BaseProps } from '../types';
import AnimatedHeader from './AnimatedHeader';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type AnimatedHeaderScrollViewProps = {
  children?: React.ReactNode;
} & BaseProps &
  React.ComponentProps<typeof Animated.ScrollView>;

const AnimatedHeaderScrollView = forwardRef(
  (
    {
      children,
      headerHeight,
      renderHeader,
      ...passThroughProps
    }: AnimatedHeaderScrollViewProps,
    ref?: React.ForwardedRef<ScrollView>
  ) => {
    const { listProps, headerProps } = useAnimatedScrollHeader({
      headerHeight,
    });

    return (
      <>
        <AnimatedHeader animatedHeader={renderHeader} {...headerProps} />
        <AnimatedScrollView ref={ref} {...listProps} {...passThroughProps}>
          {children}
        </AnimatedScrollView>
      </>
    );
  }
);

export default AnimatedHeaderScrollView as (
  props: AnimatedHeaderScrollViewProps & {
    ref?: React.ForwardedRef<ScrollView>;
  }
) => JSX.Element;
