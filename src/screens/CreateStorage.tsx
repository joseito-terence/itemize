import { View } from 'react-native';
import React from 'react';
import { Text, useTheme, TextInput, Button } from 'react-native-paper';
import LocationPicker from '../components/LocationPicker';

export default function CreateStorage() {
  const theme = useTheme();
  const [formState, setFormState] = React.useState({
    title: '',
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
          onChangeText={text => setFormState({ title: text })}
        />
        <LocationPicker />
        <Button mode="contained" className="mt-4">
          Save
        </Button>
      </View>
    </View>
  );
}
