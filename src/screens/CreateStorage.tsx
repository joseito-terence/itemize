import { View } from 'react-native';
import React from 'react';
import { Text, useTheme, TextInput, Button } from 'react-native-paper';
import LocationPicker from '../components/LocationPicker';
import { TPlace } from '../../types';
import { useForm } from '../hooks';

export default function CreateStorage() {
  const theme = useTheme();
  const [formState, handleChange] = useForm<{
    title: string;
    location: TPlace | null;
  }>({
    title: '',
    location: null,
  });

  return (
    <View className="flex-1">
      <View
        className="p-4 rounded-b-2xl"
        style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Text variant="displaySmall" className="font-bold my-4">
          Create Storage
        </Text>
      </View>
      <View className="mb-4 p-4 flex-1">
        <TextInput
          label="Title"
          mode="outlined"
          className="w-full mb-4"
          placeholder="Title to identify this item"
          value={formState.title}
          onChangeText={handleChange('title')}
        />
        <LocationPicker onChange={handleChange('location')} />
        <Button mode="contained" className="mt-4">
          Save
        </Button>
      </View>
    </View>
  );
}
