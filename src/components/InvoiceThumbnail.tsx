import React from 'react';
import { Image, View } from 'react-native';
import { TInvoiceImage } from '../../types';
import { TouchableRipple } from 'react-native-paper';

interface InvoiceThumbnailProps {
  invoice: TInvoiceImage;
}

const InvoiceThumbnail = ({ invoice }: InvoiceThumbnailProps) => {
  return (
    <View className="flex-1 rounded-lg">
      <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
        <View className="w-100 justify-center items-center rounded-lg aspect-square overflow-hidden">
          <Image source={{ uri: invoice.url }} className="w-[100%] h-[100%]" />
        </View>
      </TouchableRipple>
    </View>
  );
};

export default InvoiceThumbnail;
