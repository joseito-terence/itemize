import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Item: {
    sharedTransitionTag: string;
    id: string;
  };
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  Camera: undefined;
  CreateItem: {
    imageURI: string;
  };
  CreateStorage: undefined;
};

export type BottomTabsParamList = {
  Home: undefined;
  Search: undefined;
  AddItem: undefined;
  Storages: undefined;
};

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
  storage: TStorage;
  category: string;
  image: string;
  expiryDate: Date | null;
  userId: string;
};
