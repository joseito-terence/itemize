import React from 'react';
import { View } from 'react-native';
import { Portal, Modal, IconButton, useTheme, Text } from 'react-native-paper';
import { useDisclose } from '../hooks';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props extends ReturnType<typeof useDisclose> {}

export default function AddInvoiceActionSheet({ ...props }: Props) {
  const theme = useTheme();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(props.isOpen ? 0 : 100, { duration: 300 }),
        },
      ],
    };
  }, [props.isOpen]);

  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={props.close}
        // @ts-ignore
        className="justify-end"
        dismissable
        dismissableBackButton>
        <Animated.View
          className="w-full px-4 py-6 rounded-t-xl flex-row justify-evenly"
          style={[rStyle, { backgroundColor: theme.colors.inverseOnSurface }]}>
          <Button icon="camera" text="Camera" />
          <Button icon="file-image" text="Gallery" />
          <Button icon="file-pdf-box" text="PDF" />
        </Animated.View>
      </Modal>
    </Portal>
  );
}

interface ButtonProps {
  icon: string;
  text: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onPress }) => {
  return (
    <View className="items-center">
      <IconButton icon={icon} mode="outlined" size={40} onPress={onPress} />
      <Text>{text}</Text>
    </View>
  );
};
