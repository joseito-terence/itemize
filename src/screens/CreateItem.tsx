/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Image, Dimensions, View } from 'react-native';
import React from 'react';
import type { RootStackParamList } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { categories } from '../../constants';

export type CreateItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateItem'
>;

const { width } = Dimensions.get('window');
const CATEGORIES_LIST = categories.map(category => ({
  label: category,
  value: category,
}));

export default function CreateItem({ route }: CreateItemScreenProps) {
  const [showDropdown, setShowDropdown] = React.useState({
    location: false,
    category: false,
  });

  const toggleShowDropdown = (key: keyof typeof showDropdown) => () => {
    setShowDropdown(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: route.params.imageURI, width, height: width }}
        resizeMode="contain"
      />

      <View className="p-4" style={{ rowGap: 4 }}>
        <DropDown
          label="Location"
          mode="outlined"
          // value={projectStatus}
          // setValue={setProjectStatus}
          list={[
            { label: 'Home 001', value: 'Home 001' },
            { label: 'Home 002', value: 'Home 002' },
          ]}
          visible={showDropdown.location}
          showDropDown={toggleShowDropdown('location')}
          onDismiss={toggleShowDropdown('location')}
          dropDownStyle={{
            width: '100%',
          }}
        />

        <TextInput
          label="Title"
          mode="outlined"
          className="w-full"
          placeholder="Title to identify this item"
        />

        <TextInput
          label="Description"
          mode="outlined"
          className="w-full"
          placeholder="Description of this item"
          multiline
          numberOfLines={4}
        />

        <DropDown
          label="Category"
          mode="outlined"
          // value={projectStatus}
          // setValue={setProjectStatus}
          list={CATEGORIES_LIST}
          visible={showDropdown.location}
          showDropDown={toggleShowDropdown('category')}
          onDismiss={toggleShowDropdown('category')}
          dropDownStyle={{
            width: '100%',
          }}
        />

        <Button
          mode="contained"
          className="rounded-lg w-full"
          labelStyle={{ fontSize: 16 }}>
          Save
        </Button>
      </View>
    </ScrollView>
  );
}
