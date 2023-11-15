import React from 'react';
import { View } from 'react-native';
import { Portal, Modal, Button, useTheme } from 'react-native-paper';
import { useDisclose } from '../hooks';

interface Props extends ReturnType<typeof useDisclose> {}

export default function AddInvoiceActionSheet({ ...props }: Props) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={props.close}
        // @ts-ignore
        className="justify-end"
        dismissable
        dismissableBackButton>
        <View
          className="w-full px-4 py-6 rounded-t-xl"
          style={{ backgroundColor: theme.colors.inverseOnSurface }}>
          <Button icon="camera" mode="outlined" className="mb-4">
            Image
          </Button>
          <Button icon="file-pdf-box" mode="outlined">
            PDF
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
