import React, { useRef } from 'react';

import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  AnimatedHeaderFlatList,
  AnimatedHeaderScrollView,
} from 'react-native-collapsible-header-list';

const IMAGE_URI =
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80';
const IMAGE_HEIGHT = Dimensions.get('screen').height / 2;
const DATA = [...Array(10).keys()];

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    minHeight: Dimensions.get('screen').height - IMAGE_HEIGHT,
  },
});

const Item = ({ index }: { index: number }) => {
  return (
    <View style={styles.item}>
      <Text>{index}</Text>
    </View>
  );
};

const Header = () => {
  return (
    <Image
      height={IMAGE_HEIGHT}
      style={styles.image}
      source={{
        uri: IMAGE_URI,
      }}
    />
  );
};

export default function App() {
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  return false ? (
    <AnimatedHeaderScrollView
      contentContainerStyle={styles.contentContainer}
      ref={scrollViewRef}
      headerHeight={IMAGE_HEIGHT}
      renderHeader={Header}
    >
      {DATA.map((index) => (
        <Item key={`${index}`} index={index} />
      ))}
    </AnimatedHeaderScrollView>
  ) : (
    <AnimatedHeaderFlatList
      ref={flatListRef}
      headerHeight={IMAGE_HEIGHT}
      renderHeader={Header}
      contentContainerStyle={styles.contentContainer}
      data={DATA}
      keyExtractor={(item: number) => `${item}`}
      renderItem={({ index }) => <Item index={index} />}
    />
  );
}
