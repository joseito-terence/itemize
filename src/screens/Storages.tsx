import { View } from 'react-native';
import React from 'react';
import {
  Text,
  useTheme,
  FAB,
  MaterialBottomTabScreenProps,
} from 'react-native-paper';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsParamList, RootStackParamList } from '../../types';

type Props = CompositeScreenProps<
  MaterialBottomTabScreenProps<BottomTabsParamList, 'Storages'>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

export default function Storages({ navigation }: Props) {
  const theme = useTheme();
  return (
    <View className="flex-1">
      <View
        className="p-4 rounded-b-2xl"
        style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Text variant="displaySmall" className="font-bold my-4">
          My Storages
        </Text>
      </View>
      <View className="mb-4 p-4 flex-1">
        <FAB
          icon="plus"
          className="absolute bottom-0 right-0 m-4"
          onPress={() => navigation.navigate('CreateStorage')}
        />
      </View>
    </View>
  );
}
