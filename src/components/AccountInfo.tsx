import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  Avatar,
  IconButton,
  Text,
  useTheme,
  Modal,
  Portal,
} from 'react-native-paper';
import { useAuthUser, useDisclose } from '../hooks';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';

const PLACEHOLDER_IMAGE =
  'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg';

export default function AccountInfo() {
  const theme = useTheme();
  const disclose = useDisclose();
  const user = useAuthUser();

  const avatarImage = user?.photoURL || PLACEHOLDER_IMAGE;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(disclose.isOpen ? 1 : 0) },
        {
          translateY: withTiming(disclose.isOpen ? 0 : -400, { duration: 300 }),
        },
      ],
    };
  }, [disclose.isOpen]);

  return (
    <View>
      <TouchableOpacity onPress={disclose.open} className="border rounded-full">
        <Avatar.Image size={42} source={{ uri: avatarImage }} />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={disclose.isOpen}
          onDismiss={disclose.close}
          // @ts-ignore
          className="justify-start pt-20"
          dismissable
          dismissableBackButton>
          <Animated.View
            className="h-[150] px-2 py-4 pt-0 m-3 rounded-3xl"
            style={[rStyle, { backgroundColor: theme.colors.outline }]}>
            <View className="flex flex-row justify-between items-center">
              <IconButton
                icon="close"
                iconColor="white"
                onPress={disclose.close}
              />
              <Text className="text-white font-bold flex-1 text-center">
                Account Info
              </Text>
              <View className="w-[36]" />
            </View>
            <View
              className="bg-white flex-1 rounded-2xl p-4"
              style={{ backgroundColor: theme.colors.elevation.level5 }}>
              <View className="flex-row gap-x-4 items-center mb-3">
                <Avatar.Image size={42} source={{ uri: avatarImage }} />
                <View className="flex-1">
                  {user?.displayName && (
                    <Text variant="titleLarge" className="font-bold">
                      {user?.displayName}
                    </Text>
                  )}
                  <Text>{user?.email}</Text>
                </View>
                <IconButton
                  icon="logout"
                  onPress={() => {
                    auth()
                      .signOut()
                      .then(() => console.log('User signed out!'));
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </Modal>
      </Portal>
    </View>
  );
}
