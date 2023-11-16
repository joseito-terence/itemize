import { Dimensions, View } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../../types';
import Animated from 'react-native-reanimated';
import { sharedElementTransition } from '../helper';
import { useTheme } from 'react-native-paper';

type Props = RootStackScreenProps<'InvoiceViewer'>;

const WIDTH = Dimensions.get('window').width;
const PADDING = 16 * 2;

export default function InvoiceViewer({ route }: Props) {
  const { sharedTransitionTag, invoice } = route.params;
  const theme = useTheme();
  const imageWidth = WIDTH - PADDING;

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: theme.colors.backdrop.replace('0.4', '0.8') }}>
      {invoice.type === 'image' && (
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          sharedTransitionStyle={sharedElementTransition}
          source={{ uri: invoice.url }}
          width={imageWidth}
          height={imageWidth * (invoice.width / invoice.height)}
        />
      )}
    </View>
  );
}
