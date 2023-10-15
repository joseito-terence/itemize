import { View, Image } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';

export default function ItemCard() {
  return (
    <Card>
      <Card.Content className="flex-row">
        <Image
          source={{ uri: 'https://picsum.photos/700' }}
          className="w-[100] h-[100] rounded-md"
        />
        <View className="ml-4">
          <Text variant="headlineSmall" className="font-bold">
            Item Name
          </Text>
          <Text variant="bodyMedium" className="text-gray-500">
            Item Description
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
