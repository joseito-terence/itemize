import { View } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ItemScreenProps } from '../screens/Item';
import Animated, {
  SharedTransition,
  withSpring,
} from 'react-native-reanimated';
import { TItem } from '../../types';

const SPRING_CONFIG = {
  duration: 350,
  dampingRatio: 2,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

export const sharedElementTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight, SPRING_CONFIG),
    width: withSpring(values.targetWidth, SPRING_CONFIG),
    originX: withSpring(values.targetOriginX, SPRING_CONFIG),
    originY: withSpring(values.targetOriginY, SPRING_CONFIG),
  };
});

interface Props {
  item: TItem;
  sharedTransitionTag: string;
}

export default function ItemCard({ sharedTransitionTag, item }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<ItemScreenProps['navigation']>();

  return (
    <Card
      mode="contained"
      onPress={() =>
        navigation.navigate('Item', { item, sharedTransitionTag })
      }>
      <Card.Content className="flex-row">
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          sharedTransitionStyle={sharedElementTransition}
          source={{ uri: item.image }}
          className="w-[100] h-[100] rounded-md"
        />

        <View className="ml-4">
          <Text
            variant="headlineSmall"
            className="font-bold"
            style={{ color: theme.colors.onPrimaryContainer }}>
            {item.title}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onPrimaryContainer }}>
            {item.description}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
