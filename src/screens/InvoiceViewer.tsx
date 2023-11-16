/* eslint-disable react-native/no-inline-styles */
import { Alert, Dimensions, View } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../../types';
import Animated from 'react-native-reanimated';
import { sharedElementTransition } from '../helper';
import { useTheme, IconButton } from 'react-native-paper';
import firebaseStorage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../redux/hooks';
import { updateItem } from '../redux/itemSlice';
import Share from 'react-native-share';

type Props = RootStackScreenProps<'InvoiceViewer'>;

const WIDTH = Dimensions.get('window').width;
const PADDING = 16 * 2;

export default function InvoiceViewer({ navigation, route }: Props) {
  const { sharedTransitionTag, invoice, item } = route.params;
  const theme = useTheme();
  const imageWidth = WIDTH - PADDING;
  const dispatch = useAppDispatch();

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

  const onShare = async () => {
    Share.open({
      message: invoice.url,
      type: 'image/jpeg',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
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
          <Animated.Image
            sharedTransitionTag={sharedTransitionTag}
            sharedTransitionStyle={sharedElementTransition}
            source={{ uri: invoice.url }}
            width={imageWidth}
            height={imageWidth * (invoice.width / invoice.height)}
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
          />
          <IconButton
            mode="outlined"
            icon="download"
            size={30}
            onPress={() => {}}
          />
          <IconButton
            mode="outlined"
            icon="share-variant"
            size={30}
            onPress={onShare}
          />
        </View>
      </View>
    </View>
  );
}
