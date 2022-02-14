import { Platform, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  AnimatedStyleProp,
} from 'react-native-reanimated';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

type AnimatedListProps = React.ComponentProps<
  typeof Animated.FlatList | typeof Animated.ScrollView
>;

type useAnimatedScrollHeaderReturnType = {
  listProps: Pick<
    AnimatedListProps,
    | 'contentInset'
    | 'scrollIndicatorInsets'
    | 'contentOffset'
    | 'contentContainerStyle'
    | 'scrollEventThrottle'
    | 'onScroll'
  >;
  headerProps: {
    animatedContainerStyles: AnimatedStyleProp<ViewStyle>;
  };
};

type useAnimatedScrollHeaderProps = {
  headerHeight: number;
  onScrollHeader?: (isScrolledPastHeader: boolean) => void;
};

function useAnimatedScrollHeader({
  headerHeight,
  onScrollHeader,
}: useAnimatedScrollHeaderProps): useAnimatedScrollHeaderReturnType {
  const translateY = useSharedValue(0);
  const isScrolledPastHeader = useSharedValue(false);

  const listOffset = isIOS ? headerHeight : 0;
  const listContentContainerOffset = isAndroid ? headerHeight : 0;

  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    translateY.value = contentOffset.y + listOffset;
    if (!isScrolledPastHeader.value && headerHeight - translateY.value <= 0) {
      isScrolledPastHeader.value = true;
      onScrollHeader?.(true);
    }
    if (isScrolledPastHeader.value && headerHeight - translateY.value > 0) {
      isScrolledPastHeader.value = false;
      onScrollHeader?.(false);
    }
  });

  const animatedHeaderContainerStyles = useAnimatedStyle(
    () => ({
      opacity: interpolate(translateY.value, [100, headerHeight - 100], [1, 0]),
      transform: [
        {
          scale: interpolate(
            translateY.value,
            [-headerHeight, 0, headerHeight],
            [3, 1.4, 1]
          ),
        },
      ],
    }),
    []
  );

  return {
    listProps: {
      contentInset: { top: headerHeight },
      contentOffset: { y: -listOffset, x: 0 },
      contentContainerStyle: {
        marginTop: listContentContainerOffset,
        paddingBottom: listContentContainerOffset,
      },
      scrollEventThrottle: 16,
      onScroll,
    },
    headerProps: { animatedContainerStyles: animatedHeaderContainerStyles },
  };
}

export default useAnimatedScrollHeader;
