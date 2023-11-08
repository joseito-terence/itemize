import React, { useEffect } from 'react';
import { useAuthUser } from '../hooks';
import { useAppDispatch } from '../redux/hooks';
import { setItems } from '../redux/itemSlice';
import { setStorages } from '../redux/storageSlice';
import firestore from '@react-native-firebase/firestore';

export default function DataFetcher() {
  const user = useAuthUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection('storages')
      .where('userId', '==', user?.uid)
      .onSnapshot(querySnapshot => {
        const _storages: any = [];
        querySnapshot.forEach(documentSnapshot => {
          _storages.push({
            ...documentSnapshot.data(),
            location: documentSnapshot.data().location.toJSON(),
            id: documentSnapshot.id,
          });
        });

        dispatch(setStorages(_storages));
      });

    return () => subscriber();
  }, [dispatch, user?.uid]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('items')
      .where('userId', '==', user?.uid)
      .onSnapshot(querySnapshot => {
        const _items: any = [];
        querySnapshot.forEach(documentSnapshot => {
          _items.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        dispatch(setItems(_items));
      });

    return () => subscriber();
  }, [dispatch, user?.uid]);

  return <></>;
}
