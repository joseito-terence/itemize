import storage from '@react-native-firebase/storage';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { PermissionsAndroid, ToastAndroid } from 'react-native';

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

export function getFileExtension(url: string): string | undefined {
  const urlWithoutQuery = url.split('?')[0]; // Remove query parameters
  const pathSegments = urlWithoutQuery.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const filenameSegments = lastSegment.split('.');

  // Check if there is a valid file extension
  if (filenameSegments.length > 1) {
    return filenameSegments.pop();
  }
}

export const download = async (url: string, isTemp = false) => {
  if (!isTemp) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    if (!granted) {
      console.log('Permission denied');
      return;
    }
  }

  const configOptions = { fileCache: true };
  return RNFetchBlob.config(configOptions)
    .fetch('GET', url)
    .then(async res => {
      const base64Data = await res.readFile('base64');
      if (isTemp) {
        return {
          base64Data,
          filePath: res.path(),
        };
      }

      return RNFS.writeFile(
        RNFS.DownloadDirectoryPath + '/invoice.' + getFileExtension(url),
        base64Data,
        'base64',
      )
        .then(() => ToastAndroid.show('File downloaded', ToastAndroid.SHORT))
        .catch(() =>
          ToastAndroid.show('Error downloading file', ToastAndroid.SHORT),
        );
    })
    .catch(err => {
      console.log(err);
    });
};

export const shareWithAndroid = async (fileUrl: string, type: string) => {
  return download(fileUrl, true).then(async res => {
    if (!res) {
      return;
    }

    try {
      const { base64Data, filePath } = res;
      const base64 = `data:${type};base64,` + base64Data;
      await Share.open({ url: base64 });
      // remove the image or pdf from device's storage
      await RNFS.unlink(filePath);
    } catch (err) {
      console.log(err);
    }
  });
};
