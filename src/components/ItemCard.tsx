import { View } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ItemScreenProps } from '../screens/Item';
import Animated from 'react-native-reanimated';

interface Props {
  id: string;
  sharedTransitionTag: string;
}

export default function ItemCard({ id, sharedTransitionTag }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<ItemScreenProps['navigation']>();

  return (
    <Card
      mode="contained"
      onPress={() => navigation.navigate('Item', { id, sharedTransitionTag })}>
      <Card.Content className="flex-row">
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          source={{ uri: 'https://picsum.photos/700' }}
          className="w-[100] h-[100] rounded-md"
        />

        <View className="ml-4">
          <Text
            variant="headlineSmall"
            className="font-bold"
            style={{ color: theme.colors.onPrimaryContainer }}>
            Item Name
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onPrimaryContainer }}>
            Item Description
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
