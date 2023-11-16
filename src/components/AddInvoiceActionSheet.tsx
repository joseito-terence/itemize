import React from 'react';
import { View } from 'react-native';
import { Portal, Modal, IconButton, useTheme, Text } from 'react-native-paper';
import { useDisclose } from '../hooks';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import { useAppDispatch } from '../redux/hooks';
import { updateItem } from '../redux/itemSlice';
import { TItem } from '../../types';

interface Props extends ReturnType<typeof useDisclose> {
  item: TItem;
}

export default function AddInvoiceActionSheet({ item, ...props }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(props.isOpen ? 0 : 100, { duration: 300 }),
        },
      ],
    };
  }, [props.isOpen]);

  const getImage = async (type: 'openCamera' | 'openPicker') => {
    try {
      const image = await ImagePicker[type]({
        mediaType: 'photo',
        cropping: true,
        freeStyleCropEnabled: true,
      });
      console.log({
        path: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      });

      dispatch(
        updateItem({
          ...item,
          invoice: {
            url: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        }),
      );
    } catch (error) {
      console.log(error);
    }
    props.close();
  };

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
          <Button
            icon="camera"
            text="Camera"
            onPress={() => getImage('openCamera')}
          />
          <Button
            icon="file-image"
            text="Gallery"
            onPress={() => getImage('openPicker')}
          />
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
