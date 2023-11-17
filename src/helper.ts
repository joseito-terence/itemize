import storage from '@react-native-firebase/storage';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

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

export function shareWithAndroid(fileUrl: string, type: string) {
  let filePath = '';
  const configOptions = { fileCache: true };
  return RNFetchBlob.config(configOptions)
    .fetch('GET', fileUrl)
    .then(resp => {
      filePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async base64Data => {
      base64Data = `data:${type};base64,` + base64Data;
      await Share.open({ url: base64Data });
      // remove the image or pdf from device's storage
      await RNFS.unlink(filePath);
    })
    .catch(err => {
      console.log(err);
    });
}
