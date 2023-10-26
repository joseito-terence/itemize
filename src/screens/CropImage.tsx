import { View, Image } from 'react-native';
import React from 'react';
import type { RootStackParamList } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type CropImageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CropImage'
>;

export default function CropImage({ route }: CropImageScreenProps) {
  return (
    <View>
      <Image
        source={{ uri: route.params.imageURI }}
        className="w-full h-[300]"
        resizeMode="contain"
      />
    </View>
  );
}
