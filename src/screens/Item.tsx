/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView, Dimensions, Alert } from 'react-native';
import React from 'react';
import {
  Card,
  IconButton,
  Text,
  useTheme,
  Menu,
  Divider,
} from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Animated from 'react-native-reanimated';
import { sharedElementTransition } from '../components/ItemCard';
import { useDisclose } from '../hooks';
import firebaseStorage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/hooks';

export type ItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Item'
>;

const { width } = Dimensions.get('window');

export default function Item({ navigation, route }: ItemScreenProps) {
  const theme = useTheme();
  const { sharedTransitionTag, item } = route.params;
  const storages = useAppSelector(state => state.storages);
  const storage = storages.find(s => s.id === item.storage);

  const menuDisclose = useDisclose();

  const deleteItem = async () => {
    try {
      await Promise.allSettled([
        firebaseStorage().refFromURL(item.image).delete(),
        firestore().collection('items').doc(item.id).delete(),
      ]);

      console.log('Item deleted successfully.');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const onDelete = () => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteItem();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View className="flex-row justify-between">
        <IconButton
          icon="arrow-left"
          rippleColor="rgba(0, 0, 0, .32)"
          iconColor="white"
          style={{ backgroundColor: theme.colors.backdrop }}
          onPress={() => navigation.goBack()}
        />

        <Menu
          visible={menuDisclose.isOpen}
          onDismiss={menuDisclose.close}
          anchor={
            <IconButton
              icon="dots-vertical"
              rippleColor="rgba(0, 0, 0, .32)"
              iconColor="white"
              style={{ backgroundColor: theme.colors.backdrop }}
              onPress={menuDisclose.open}
            />
          }>
          <Menu.Item onPress={() => {}} title="Edit" leadingIcon="pencil" />
          <Divider />
          <Menu.Item onPress={onDelete} title="Delete" leadingIcon="delete" />
        </Menu>
      </View>
      <View className="-top-[80]">
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          sharedTransitionStyle={sharedElementTransition}
          source={{ uri: item.image }}
          style={{ width, height: width, backgroundColor: 'green' }}
          resizeMode="contain"
        />

        <View className="p-4">
          <Text variant="headlineLarge" className="font-bold">
            {item.title}
          </Text>

          <View className="flex-row my-4" style={{ gap: 24 }}>
            <Info title={storage?.name} text="Location" />
            <Info title={item.category} text="Category" />
          </View>

          {item.description && (
            <Card>
              <Card.Content>
                <Text variant="bodyMedium">{item.description}</Text>
              </Card.Content>
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const Info = ({ title = '', text = '' }) => {
  const theme = useTheme();

  return (
    <View className="flex-1">
      <Card
        mode="elevated"
        elevation={5}
        className="justify-center"
        style={{
          backgroundColor: theme.colors.primary,
          borderColor: 'black',
          borderWidth: 2,
        }}>
        <Card.Content>
          <Text
            variant="headlineSmall"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: theme.colors.onPrimary }}
            className="text-center font-extrabold">
            {title}
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onPrimary }}
            className="text-center font-bold">
            {text}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};
