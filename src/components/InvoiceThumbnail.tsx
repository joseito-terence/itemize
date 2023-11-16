import React from 'react';
import { Image, View } from 'react-native';
import { TInvoice } from '../../types';
import { TouchableRipple, useTheme } from 'react-native-paper';

interface InvoiceThumbnailProps {
  invoice: TInvoice;
}

const InvoiceThumbnail = ({ invoice }: InvoiceThumbnailProps) => {
  const theme = useTheme();
  return (
    <View
      className="flex-1 rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.colors.primary }}>
      <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
        <View className="w-100 justify-center items-center rounded-lg aspect-square">
          <Image source={{ uri: invoice.url }} className="w-[100%] h-[100%]" />
        </View>
      </TouchableRipple>
    </View>
  );
};

export default InvoiceThumbnail;
