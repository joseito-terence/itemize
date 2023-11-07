/* eslint-disable react-native/no-inline-styles */
import { FlatList, View } from 'react-native';
import React from 'react';
import {
  Text,
  useTheme,
  FAB,
  MaterialBottomTabScreenProps,
  Card,
} from 'react-native-paper';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsParamList, RootStackParamList } from '../../types';
import { useAppSelector } from '../redux/hooks';

type Props = CompositeScreenProps<
  MaterialBottomTabScreenProps<BottomTabsParamList, 'Storages'>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

export default function Storages({ navigation }: Props) {
  const theme = useTheme();
  const storages = useAppSelector(state => state.storages);

  return (
    <View className="flex-1">
      <View
        className="p-4 rounded-b-2xl"
        style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Text variant="displaySmall" className="font-bold my-4">
          My Storages
        </Text>
      </View>

      <FlatList
        data={storages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card mode="contained">
            <Card.Content>
              <Text
                variant="headlineSmall"
                className="font-bold"
                style={{ color: theme.colors.onPrimaryContainer }}>
                {item.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onPrimaryContainer }}>
                {item.locationName}
              </Text>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ padding: 16, rowGap: 16 }}
      />

      <FAB
        icon="plus"
        className="absolute bottom-0 right-0 m-4"
        onPress={() => navigation.navigate('CreateStorage')}
      />
    </View>
  );
}
