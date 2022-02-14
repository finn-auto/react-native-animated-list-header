import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import type { BaseProps } from 'src/types';
import useAnimatedScrollHeader from '../hooks/useAnimatedScrollHeader';
import AnimatedHeader from './AnimatedHeader';

type AnimatedHeaderFlatListProps = BaseProps &
  React.ComponentProps<typeof Animated.FlatList>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedHeaderFlatList = forwardRef(
  (
    {
      headerHeight,
      renderHeader,
      ...passThroughProps
    }: AnimatedHeaderFlatListProps,
    ref?: React.ForwardedRef<FlatList>
  ) => {
    const { listProps, headerProps } = useAnimatedScrollHeader({
      headerHeight,
    });

    return (
      <>
        <AnimatedHeader animatedHeader={renderHeader} {...headerProps} />
        <AnimatedFlatList
          ref={ref}
          {...listProps}
          {...passThroughProps}
          progressViewOffset={headerHeight}
        />
      </>
    );
  }
);

// Generic forwarded ref type assertion taken from:
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion

export default AnimatedHeaderFlatList as (
  props: AnimatedHeaderFlatListProps & { ref?: React.ForwardedRef<FlatList> }
) => JSX.Element;
