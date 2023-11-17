/* eslint-disable react-native/no-inline-styles */
import { Alert, Dimensions, View } from 'react-native';
import React, { useState } from 'react';
import { RootStackScreenProps } from '../../types';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { shareWithAndroid, sharedElementTransition } from '../helper';
import { useTheme, IconButton } from 'react-native-paper';
import firebaseStorage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../redux/hooks';
import { updateItem } from '../redux/itemSlice';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type Props = RootStackScreenProps<'InvoiceViewer'>;

const WIDTH = Dimensions.get('window').width;
const PADDING = 16 * 2;
const imageWidth = WIDTH - PADDING;

export default function InvoiceViewer({ navigation, route }: Props) {
  const { sharedTransitionTag, invoice, item } = route.params;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [isSharing, setIsSharing] = useState(false);

  const deleteInvoice = async () => {
    dispatch(updateItem({ ...item, invoice: undefined }));

    await Promise.allSettled([
      firebaseStorage().refFromURL(invoice.url).delete(),
      firestore().collection('items').doc(item.id).update({ invoice: null }),
    ]).catch(console.log);
  };

  const onDelete = () => {
    Alert.alert(
      'Delete Invoice',
      'Are you sure you want to delete this invoice?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteInvoice();
            navigation.goBack();
          },
        },
      ],
    );
  };

  const onShare = () => {
    if (isSharing) {
      return;
    }
    setIsSharing(true);
    shareWithAndroid(invoice.url, 'image/jpeg').finally(() => {
      setIsSharing(false);
    });
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: theme.colors.backdrop.replace('0.4', '0.8') }}>
      <View className="flex-row justify-end">
        <IconButton
          icon="close"
          rippleColor="rgba(0, 0, 0, .32)"
          iconColor="white"
          style={{ backgroundColor: theme.colors.backdrop }}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View className="flex-1 justify-center items-center">
        {invoice.type === 'image' && (
          <Image
            uri={invoice.url}
            width={invoice.width}
            height={invoice.height}
            sharedTransitionTag={sharedTransitionTag}
          />
        )}

        <View
          className="w-full mt-4 justify-center flex-row"
          style={{ columnGap: 18 }}>
          <IconButton
            mode="outlined"
            icon="delete"
            size={30}
            onPress={onDelete}
            iconColor={!theme.dark ? theme.colors.background : undefined}
          />
          <IconButton
            mode="outlined"
            icon="download"
            size={30}
            onPress={() => {}}
            iconColor={!theme.dark ? theme.colors.background : undefined}
          />
          <IconButton
            mode="outlined"
            icon="share-variant"
            size={30}
            onPress={onShare}
            iconColor={!theme.dark ? theme.colors.background : undefined}
          />
        </View>
      </View>
    </View>
  );
}

type ImageProps = {
  uri: string;
  width: number;
  height: number;
  sharedTransitionTag: string;
};

const Image = ({ uri, width, height, sharedTransitionTag }: ImageProps) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const imageHeight = imageWidth * (width / height);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -imageWidth / 2 },
        { translateY: -imageHeight / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: imageWidth / 2 },
        { translateY: imageHeight / 2 },
      ],
    };
  });

  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View className="z-10">
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          sharedTransitionStyle={sharedElementTransition}
          source={{ uri }}
          width={imageWidth}
          height={imageHeight}
          style={rImageStyle}
        />
        <Animated.View
          style={rFocalPointStyle}
          className="w-[20] h-[20] rounded-full absolute"
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};
