import storage from '@react-native-firebase/storage';

export const saveImage = async (imagePath: string) => {
  const reference = storage().ref(imagePath.split('/').pop());
  await reference.putFile(imagePath);
  const url = await reference.getDownloadURL();
  return url;
};
