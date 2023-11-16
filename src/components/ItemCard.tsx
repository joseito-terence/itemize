import { View } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ItemScreenProps } from '../screens/Item';
import Animated from 'react-native-reanimated';
import { TItem } from '../../types';
import { useAppSelector } from '../redux/hooks';
import { sharedElementTransition } from '../helper';

interface Props {
  item: TItem;
  sharedTransitionTag: string;
}

export default function ItemCard({ sharedTransitionTag, item }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<ItemScreenProps['navigation']>();
  const storages = useAppSelector(state => state.storages);
  const storage = storages.find(s => s.id === item.storage);

  return (
    <Card
      mode="contained"
      onPress={() =>
        navigation.navigate('Item', { itemId: item.id, sharedTransitionTag })
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
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-extrabold max-w-[240]"
            style={{ color: theme.colors.onPrimaryContainer }}>
            {item.title}
          </Text>
          <Text
            variant="bodyLarge"
            className="font-bold"
            style={{ color: theme.colors.onPrimaryContainer }}>
            {storage?.name}
          </Text>
          <Text
            variant="bodyMedium"
            numberOfLines={1}
            ellipsizeMode="tail"
            className="max-w-[240]"
            style={{ color: theme.colors.onPrimaryContainer }}>
            {item.description}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
