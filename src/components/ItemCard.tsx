import { View, Image } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';

export default function ItemCard() {
  const theme = useTheme();

  return (
    <Card mode="contained">
      <Card.Content className="flex-row">
        <Image
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
