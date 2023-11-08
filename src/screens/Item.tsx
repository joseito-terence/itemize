/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Animated from 'react-native-reanimated';
import { sharedElementTransition } from '../components/ItemCard';

export type ItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Item'
>;

const { width } = Dimensions.get('window');

export default function Item({ navigation, route }: ItemScreenProps) {
  const theme = useTheme();
  const { sharedTransitionTag, item } = route.params;

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View>
        <IconButton
          icon="arrow-left"
          rippleColor="rgba(0, 0, 0, .32)"
          iconColor="white"
          style={{ backgroundColor: theme.colors.backdrop }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View className="-top-[80]">
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          sharedTransitionStyle={sharedElementTransition}
          source={{ uri: item.image }}
          style={{ width, height: width, backgroundColor: 'green' }}
          resizeMode="contain"
        />

        <View className="p-4">
          <Text variant="headlineLarge" className="font-bold">
            {item.title}
          </Text>

          <View className="flex-row my-4" style={{ gap: 24 }}>
            <Info title={item.title} text="Location" />
            <Info title={item.category} text="Category" />
          </View>

          {item.description && (
            <Card>
              <Card.Content>
                <Text variant="bodyMedium">{item.description}</Text>
              </Card.Content>
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const Info = ({ title = '', text = '' }) => {
  const theme = useTheme();

  return (
    <View className="flex-1">
      <Card
        mode="elevated"
        elevation={5}
        className="justify-center"
        style={{
          backgroundColor: theme.colors.primary,
          borderColor: 'black',
          borderWidth: 2,
        }}>
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
    </View>
  );
};
