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
  CropImage: {
    imageURI: string;
  };
};

export type BottomTabsParamList = {
  Home: undefined;
  Search: undefined;
  AddItem: undefined;
  Settings: undefined;
};
