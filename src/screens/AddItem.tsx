/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import ScanBorder from '../assets/ScanBorder';
import Animated, {
  withRepeat,
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MaterialBottomTabScreenProps } from 'react-native-paper/react-navigation';

import type { RootStackParamList, BottomTabsParamList } from '../../types';

const SCAN_BOX_SIZE = 261;

type Props = CompositeScreenProps<
  MaterialBottomTabScreenProps<BottomTabsParamList, 'AddItem'>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

export default function AddItem({ navigation }: Props) {
  const theme = useTheme();
  const translateY = useSharedValue(-(SCAN_BOX_SIZE - 60));

  useEffect(() => {
    translateY.value = withSequence(
      withTiming(-(SCAN_BOX_SIZE - 60), {
        duration: 1000,
        easing: Easing.ease,
      }),
      withRepeat(
        withTiming(SCAN_BOX_SIZE / 2, {
          duration: 5000,
          easing: Easing.ease,
        }),
        -1,
      ),
    );
  }, [translateY]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View className="flex-1 p-4">
      <View className="pb-4">
        <Text variant="displaySmall" className="font-bold mt-4 mb-6">
          Add Item
        </Text>
      </View>

      <View className="flex-1 justify-evenly">
        <View className="flex-1 items-center justify-center">
          <View
            className="rounded-[55px] overflow-hidden"
            style={{ width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE }}>
            <View className="absolute bottom-0 top-0 justify-center items-center w-full">
              <Image source={require('../assets/rubiks_cube.png')} />
              <Animated.View
                style={[
                  rStyle,
                  {
                    borderBottomColor: theme.colors.onPrimaryContainer,
                    borderBottomWidth: 2,
                  },
                ]}
                className="absolute w-full">
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={[
                    'transparent',
                    'transparent',
                    theme.colors.primaryContainer,
                  ]}
                  style={{ flex: 1, height: SCAN_BOX_SIZE / 2 }}
                />
              </Animated.View>
            </View>
            <ScanBorder />
          </View>
        </View>

        <View className="mb-10 gap-y-6">
          <Text className="text-center">
            Press continue to add an item. You can add an item by taking a
            picture or uploading an image from your gallery.
          </Text>

          <Button
            mode="contained"
            className="rounded-lg w-full"
            onPress={() => navigation.navigate('Camera')}
            labelStyle={{ fontSize: 16 }}>
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
}
