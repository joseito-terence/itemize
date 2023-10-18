/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Animated from 'react-native-reanimated';

export type ItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Item'
>;

const { width } = Dimensions.get('window');

export default function Item({ navigation, route }: ItemScreenProps) {
  const theme = useTheme();

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View>
        <IconButton
          icon="arrow-left"
          rippleColor="rgba(0, 0, 0, .32)"
          iconColor={theme.colors.onPrimary}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View className="-top-[80]">
        <Animated.Image
          sharedTransitionTag={route.params.sharedTransitionTag}
          source={{ uri: 'https://picsum.photos/700' }}
          style={{ width, height: width, backgroundColor: 'green' }}
          resizeMode="contain"
        />

        <View className="p-4">
          <Text variant="headlineLarge" className="font-bold">
            Item Name
          </Text>

          <View className="flex-row my-4" style={{ gap: 24 }}>
            <Info title="Home 001" text="Location" />
            <Info title="Kitchen" text="Category" />
          </View>

          <Card>
            <Card.Content>
              <Text variant="bodyMedium">
                Multi-Cams can capture Frames from all physical Camera Devices
                at the same time and fuse them together to create higher-quality
                Photos.
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const Info = ({ title = '', text = '' }) => {
  const theme = useTheme();

  return (
    <View className="flex-1">
      <Shadow
        style={{ borderRadius: 10, width: '100%' }}
        distance={1}
        startColor={'#000'}
        endColor={'#ff00ff10'}
        offset={[-3, 3]}>
        <Card
          mode="elevated"
          className="justify-center"
          style={{ backgroundColor: theme.colors.primary }}>
          <Card.Content>
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.onPrimary }}
              className="text-center font-extrabold">
              {title}
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onPrimary }}
              className="text-center font-bold">
              {text}
            </Text>
          </Card.Content>
        </Card>
      </Shadow>
    </View>
  );
};
