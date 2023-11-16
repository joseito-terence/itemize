import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../../types';

type Props = RootStackScreenProps<'InvoiceViewer'>;

export default function InvoiceViewer({}: Props) {
  return (
    <View>
      <Text>Invoice</Text>
    </View>
  );
}
