import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import useAnimatedScrollHeader from '../hooks/useAnimatedScrollHeader';
import AnimatedHeader from './AnimatedHeader';

type AnimatedHeaderFlatListProps = {
  headerHeight: number;
  renderHeader: () => React.ReactElement;
} & React.ComponentProps<typeof Animated.FlatList>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// Generic forwarded ref type assertion taken from:
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion

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
export default AnimatedHeaderFlatList as (
  props: AnimatedHeaderFlatListProps & { ref?: React.ForwardedRef<FlatList> }
) => JSX.Element;
