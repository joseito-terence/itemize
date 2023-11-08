/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import type { RootStackParamList, TStorage } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput, useTheme, IconButton } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { categories } from '../../constants';
import { useForm } from '../hooks';
import { useAppSelector } from '../redux/hooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

export type CreateItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateItem'
>;

const { width } = Dimensions.get('window');
const CATEGORIES_LIST = categories.map(category => ({
  label: category,
  value: category,
}));

type TFormState = {
  title: string;
  description: string;
  storage: TStorage;
  category: string;
  expiryDate: Date | null;
};

export default function CreateItem({
  navigation,
  route,
}: CreateItemScreenProps) {
  const theme = useTheme();
  const storages = useAppSelector(state => state.storages);
  const STORAGE_LIST = storages.map(storage => ({
    label: storage.name,
    value: storage.id,
  }));

  const [showDropdown, setShowDropdown] = React.useState({
    storage: false,
    category: false,
    date: false,
  });

  const [formState, onChange] = useForm<TFormState>({
    title: '',
    description: '',
    storage: storages[0],
    category: '',
    expiryDate: null,
  });

  const toggleShowDropdown = (key: keyof typeof showDropdown) => () => {
    setShowDropdown(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View>
        <IconButton
          icon="arrow-left"
          rippleColor="rgba(0, 0, 0, .32)"
          iconColor="white"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: theme.colors.backdrop }}
        />
      </View>
      <View className="-top-[80]">
        <Image
          source={{ uri: route.params.imageURI, width, height: width }}
          resizeMode="contain"
        />

        <View className="p-4" style={{ rowGap: 12 }}>
          <DropDown
            label="Storage"
            mode="outlined"
            value={formState.storage}
            setValue={onChange('storage')}
            list={STORAGE_LIST}
            visible={showDropdown.storage}
            showDropDown={toggleShowDropdown('storage')}
            onDismiss={toggleShowDropdown('storage')}
            dropDownStyle={{
              width: '100%',
            }}
          />

          <TextInput
            label="Title"
            mode="outlined"
            className="w-full"
            placeholder="Title to identify this item"
            value={formState.title}
            onChangeText={onChange('title')}
          />

          <TextInput
            label="Description"
            mode="outlined"
            className="w-full"
            placeholder="Description of this item"
            multiline
            numberOfLines={4}
            value={formState.description}
            onChangeText={onChange('description')}
          />

          <DropDown
            label="Category"
            mode="outlined"
            value={formState.category}
            setValue={onChange('category')}
            list={CATEGORIES_LIST}
            visible={showDropdown.category}
            showDropDown={toggleShowDropdown('category')}
            onDismiss={toggleShowDropdown('category')}
            dropDownStyle={{
              width: '100%',
            }}
          />

          <TouchableOpacity onPress={toggleShowDropdown('date')}>
            <TextInput
              label="Expiry Date (Optional)"
              mode="outlined"
              className="w-full"
              placeholder="DD/MM/YYYY"
              value={
                formState.expiryDate
                  ? dayjs(formState.expiryDate).format('DD/MM/YYYY')
                  : ''
              }
              onPressIn={toggleShowDropdown('date')}
              right={
                formState.expiryDate && (
                  <TextInput.Icon
                    icon="close"
                    onPress={() => onChange('expiryDate')(null)}
                  />
                )
              }
              editable={false}
            />
          </TouchableOpacity>

          {showDropdown.date && (
            <DateTimePicker
              testID="dateTimePicker"
              value={formState.expiryDate || new Date()}
              mode="date"
              onChange={(_, selectedDate) => {
                toggleShowDropdown('date')();
                onChange('expiryDate')(selectedDate);
              }}
            />
          )}

          <Button
            mode="contained"
            className="rounded-lg w-full my-4"
            labelStyle={{ fontSize: 16 }}>
            Save
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
