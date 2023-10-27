import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  Camera as VisionCamera,
} from 'react-native-vision-camera';
import { useAppState } from '@react-native-community/hooks';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import ImagePicker from 'react-native-image-crop-picker';

export type CameraScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Camera'
>;

export default function Camera({ navigation }: CameraScreenProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<VisionCamera>(null);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  if (!hasPermission) {
    requestPermission();
  }

  if (device == null) {
    return <></>;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <VisionCamera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        enableZoomGesture
        photo
        orientation="portrait"
      />

      {isActive && (
        <View className="w-full justify-center items-center p-6 absolute bottom-0">
          <TouchableOpacity
            onPress={async () => {
              const photo = await camera.current?.takePhoto({
                qualityPrioritization: 'quality',
                enableShutterSound: false,
                flash: 'auto',
              });

              if (photo?.path) {
                ImagePicker.openCropper({
                  path: `file://${photo.path}`,
                  width: 1024,
                  height: 1024,
                  mediaType: 'photo',
                }).then(image => {
                  console.log(image);
                  navigation.navigate('CreateItem', {
                    imageURI: image.path,
                  });
                });
              }
            }}
            className="h-16 w-16 rounded-full border-4 border-white"
          />
        </View>
      )}
    </View>
  );
}
