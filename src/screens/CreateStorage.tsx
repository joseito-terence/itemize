import { View } from 'react-native';
import React, { useState } from 'react';
import { Text, useTheme, TextInput, Button } from 'react-native-paper';
import LocationPicker from '../components/LocationPicker';
import { RootStackParamList, TPlace, TStorage } from '../../types';
import { useAuthUser, useForm } from '../hooks';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function CreateStorage({ navigation }: Props) {
  const theme = useTheme();
  const user = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, handleChange] = useForm<{
    title: string;
    location: TPlace | null;
  }>({
    title: '',
    location: null,
  });

  if (!user) {
    return null;
  }

  const save = () => {
    if (!formState.title) {
      return;
    }
    setIsLoading(true);

    let storage: Omit<TStorage, 'id'> = {
      name: formState.title,
      userId: user.uid,
    };

    if (formState.location) {
      storage = {
        ...storage,
        locationName: formState.location.display_name,
        location: new firestore.GeoPoint(
          formState.location.lat,
          formState.location.lon,
        ),
      };
    }

    firestore()
      .collection('storages')
      .add(storage)
      .then(() => {
        if (navigation.getState().routeNames[0] === 'BottomTabs') {
          navigation.goBack();
        } else {
          navigation.navigate('BottomTabs', { screen: 'Home' });
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

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
          placeholder="Title to identify this storage place"
          value={formState.title}
          onChangeText={handleChange('title')}
        />
        <LocationPicker onChange={handleChange('location')} />
        <Button
          mode="contained"
          className="mt-4"
          onPress={save}
          loading={isLoading}>
          Save
        </Button>
      </View>
    </View>
  );
}
