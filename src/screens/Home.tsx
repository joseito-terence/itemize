/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView } from 'react-native';
import React from 'react';
import { Text, Card, useTheme, Button } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const theme = useTheme();

  return (
    <ScrollView>
      <View
        className="p-4 rounded-b-2xl"
        style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Text variant="displaySmall" className="font-bold mt-4 mb-6">
          Home
        </Text>

        <View className="flex-row mx-auto mb-4" style={{ gap: 24 }}>
          <InfoCard title="2" text="Locations" />
          <InfoCard title="103" text="Items" />
        </View>
      </View>

      <View className="p-4">
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
    </ScrollView>
  );
}

const InfoCard = ({ title = '', text = '' }) => {
  const theme = useTheme();

  return (
    <Shadow
      style={{ flex: 1, borderRadius: 10, aspectRatio: 1 }}
      distance={1}
      startColor={'#000'}
      endColor={'#ff00ff10'}
      offset={[-3, 3]}>
      <Card
        mode="elevated"
        className="flex-1 aspect-square justify-center"
        style={{ backgroundColor: theme.colors.primary }}>
        <Card.Content>
          <Text
            variant="headlineLarge"
            style={{ color: theme.colors.onPrimary }}
            className="text-center font-extrabold text-5xl">
            {title}
          </Text>
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onPrimary }}
            className="text-center font-bold text-2xl">
            {text}
          </Text>
        </Card.Content>
      </Card>
    </Shadow>
  );
};
