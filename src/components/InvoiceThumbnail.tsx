import React from 'react';
import { View } from 'react-native';
import { TInvoice } from '../../types';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ItemScreenProps } from '../screens/Item';
import Animated from 'react-native-reanimated';
import { sharedElementTransition } from '../helper';

interface InvoiceThumbnailProps {
  invoice: TInvoice;
}

const InvoiceThumbnail = ({ invoice }: InvoiceThumbnailProps) => {
  const theme = useTheme();
  const navigation = useNavigation<ItemScreenProps['navigation']>();
  const sharedTransitionTag = `Invoice-${invoice.url}`;

  return (
    <View
      className="flex-1 rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.colors.primary }}>
      <TouchableRipple
        onPress={() =>
          navigation.navigate('InvoiceViewer', { invoice, sharedTransitionTag })
        }
        rippleColor="rgba(0, 0, 0, .32)">
        <View className="w-100 justify-center items-center rounded-lg aspect-square">
          {invoice?.type === 'image' && (
            <Animated.Image
              sharedTransitionTag={sharedTransitionTag}
              sharedTransitionStyle={sharedElementTransition}
              source={{
                uri: invoice.url,
                width: invoice.width,
                height: invoice.height,
              }}
              className="w-[100%] h-[100%]"
            />
          )}
        </View>
      </TouchableRipple>
    </View>
  );
};

export default InvoiceThumbnail;
