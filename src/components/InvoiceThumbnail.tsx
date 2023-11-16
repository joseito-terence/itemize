import React from 'react';
import { View } from 'react-native';
import { TInvoiceImage } from '../../types';
import { TouchableRipple, Text } from 'react-native-paper';

interface InvoiceThumbnailProps {
  invoice: TInvoiceImage;
}

const InvoiceThumbnail = ({ invoice }: InvoiceThumbnailProps) => {
  return (
    <View className="flex-1 rounded-lg">
      <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
        <View className="w-100 justify-center items-center rounded-lg aspect-square">
          <Text variant="bodyLarge">{invoice.url}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default InvoiceThumbnail;
