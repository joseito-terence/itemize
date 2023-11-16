import storage from '@react-native-firebase/storage';
import { SharedTransition, withSpring } from 'react-native-reanimated';

export const saveImage = async (imagePath: string) => {
  const reference = storage().ref(imagePath.split('/').pop());
  await reference.putFile(imagePath);
  const url = await reference.getDownloadURL();
  return url;
};

const SPRING_CONFIG = {
  duration: 350,
  dampingRatio: 2,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

export const sharedElementTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight, SPRING_CONFIG),
    width: withSpring(values.targetWidth, SPRING_CONFIG),
    originX: withSpring(values.targetOriginX, SPRING_CONFIG),
    originY: withSpring(values.targetOriginY, SPRING_CONFIG),
  };
});
