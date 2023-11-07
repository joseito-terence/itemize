/* eslint-disable react-native/no-inline-styles */
import { Dimensions, View } from 'react-native';
import React from 'react';
import { Text, Card, useTheme, Button } from 'react-native-paper';
import ItemCard from '../components/ItemCard';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { withAnimated } from '../hooks';
import AccountInfo from '../components/AccountInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useColorScheme } from '../components/ColorScheme';
import { useAppSelector } from '../redux/hooks';

const { width } = Dimensions.get('window');
const INFO_CARD_SIZE = (width - 48) / 2;

const HEADER_HEIGHT = {
  min: 150,
  max: 300,
};
const SCROLL_DISTANCE = HEADER_HEIGHT.max - HEADER_HEIGHT.min;

const AnimatedText = withAnimated(Text);

export default function Home() {
  const theme = useTheme();
  const storagesCount = useAppSelector(state => state.storages.length);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const rHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [HEADER_HEIGHT.max, HEADER_HEIGHT.min],
      Extrapolate.CLAMP,
    );

    const paddingTop = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [16, 0],
      Extrapolate.CLAMP,
    );

    return { height, paddingTop };
  });

  const rHeaderTextStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [32, 22],
      Extrapolate.CLAMP,
    );

    const marginBottom = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [24, 12],
      Extrapolate.CLAMP,
    );

    return { fontSize, marginBottom };
  });

  const rOptionsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return { opacity };
  });

  return (
    <View className="flex-1">
      <Animated.View
        className="rounded-b-2xl absolute left-0 right-0 top-0 z-[1000]"
        style={[
          {
            backgroundColor: theme.colors.secondaryContainer,
            padding: 16,
            marginBottom: 14,
          },
          rHeaderStyle,
        ]}>
        <View className="flex-row items-center justify-between">
          <Animated.Text
            style={[
              rHeaderTextStyle,
              { color: theme.colors.onSecondaryContainer },
            ]}
            className="font-bold mt-4 mb-6">
            Home
          </Animated.Text>

          <Animated.View
            style={rOptionsStyle}
            className="flex-row items-center">
            <ThemeSwitcher />
            <AccountInfo />
          </Animated.View>
        </View>

        <View className="flex-1 flex-row mx-auto mb-4" style={{ gap: 20 }}>
          <InfoCard title={storagesCount} text="Storages" scrollY={scrollY} />
          <InfoCard title={103} text="Items" scrollY={scrollY} />
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="-z-10">
        <View className="p-4" style={{ marginTop: HEADER_HEIGHT.max }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="headlineMedium" className="font-bold">
              Recents
            </Text>
            <Button>View All</Button>
          </View>

          <View style={{ gap: 14 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <ItemCard
                key={i}
                id={i.toString()}
                sharedTransitionTag={`Home_${i.toString()}`}
              />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

type InfoCardProps = {
  title: number;
  text: string;
  scrollY: SharedValue<number>;
};

const InfoCard = ({ title, text, scrollY }: InfoCardProps) => {
  const theme = useTheme();

  const rCardStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [INFO_CARD_SIZE, HEADER_HEIGHT.min - 80],
      Extrapolate.CLAMP,
    );

    return { height };
  });

  const rTitleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [32, 22],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, -50],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, -6],
      Extrapolate.CLAMP,
    );

    return { fontSize, transform: [{ translateX }, { translateY }] };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [24, 18],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, 10],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, -46],
      Extrapolate.CLAMP,
    );

    return { fontSize, transform: [{ translateX }, { translateY }] };
  });

  return (
    <Animated.View style={[{ width: INFO_CARD_SIZE }, rCardStyle]}>
      <Card
        mode="elevated"
        className="flex-1 justify-center"
        elevation={5}
        style={{
          backgroundColor: theme.colors.primary,
          width: INFO_CARD_SIZE,
          borderColor: 'black',
          borderWidth: 2,
        }}>
        <Card.Content>
          <AnimatedText
            variant="headlineLarge"
            style={[rTitleStyle, { color: theme.colors.onPrimary }]}
            className="text-center font-extrabold text-5xl">
            {title}
          </AnimatedText>
          <AnimatedText
            variant="bodyLarge"
            style={[rTextStyle, { color: theme.colors.onPrimary }]}
            className="text-center font-bold text-2xl">
            {text}
          </AnimatedText>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const ThemeSwitcher = () => {
  const theme = useTheme();
  const { toggle, active } = useColorScheme();

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(e => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <View className="mr-3 h-[42] w-[42] items-center justify-center">
      <GestureDetector gesture={pan}>
        <MaterialIcons
          name={theme.dark ? 'light-mode' : 'dark-mode'}
          size={30}
          color={theme.colors.primary}
        />
      </GestureDetector>
    </View>
  );
};
