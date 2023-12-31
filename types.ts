import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { NavigatorScreenParams } from '@react-navigation/native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MaterialBottomTabScreenProps } from 'react-native-paper/react-navigation';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Item: {
    sharedTransitionTag: string;
    itemId: string;
  };
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  Camera: undefined;
  CreateItem: {
    imageURI: string;
  };
  CreateStorage: undefined;
  InvoiceViewer: {
    sharedTransitionTag: string;
    invoice: TInvoice;
    item: TItem;
  };
};

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;

export type BottomTabsParamList = {
  Home: undefined;
  Search: undefined;
  AddItem: undefined;
  Storages: undefined;
};

export type BottomTabsScreenProps<
  ScreenName extends keyof BottomTabsParamList,
> = CompositeScreenProps<
  MaterialBottomTabScreenProps<BottomTabsParamList, ScreenName>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

export type TPlace = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: number;
  lon: number;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
};

export type TStorage = {
  id: string;
  name: string;
  locationName?: string;
  location?: FirebaseFirestoreTypes.GeoPoint;
  userId: string;
};

export type TItem = {
  id: string;
  title: string;
  description: string;
  storage: string;
  category: string;
  image: string;
  expiryDate: Date | null;
  userId: string;
  invoice?: TInvoice;
  reminder?: TReminder;
};

export type TReminder = {
  title: string;
  date: string;
  time: string;
};

export type TInvoice = TInvoiceImage | TInvoicePDF;

export type TInvoiceImage = {
  url: string;
  width: number;
  height: number;
  type: 'image';
};

export type TInvoicePDF = {
  url: string;
  type: 'pdf';
};
