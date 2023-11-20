/* eslint-disable react-native/no-inline-styles */
import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDisclose, useForm } from '../hooks';
import { TItem } from '../../types';
import {
  Portal,
  Modal,
  Text,
  useTheme,
  IconButton,
  TextInput,
  Button,
  TouchableRipple,
} from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useAppDispatch } from '../redux/hooks';
import { updateItem } from '../redux/itemSlice';
import ItemActionButton from './ItemActionButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

interface disclose {
  item: TItem;
}

export default function ReminderModal({ item }: disclose) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const disclose = useDisclose();

  const [formState, onChange] = useForm(
    item?.reminder
      ? {
          title: item.reminder.title,
          date: new Date(item.reminder.date),
          time: new Date(`${item.reminder.date}T${item.reminder.time}`),
        }
      : {
          title: '',
          date: '',
          time: '',
        },
  );
  const dispatch = useAppDispatch();

  const onCreate = async () => {
    if (!formState.title || !formState.date || !formState.time) {
      return;
    }
    setLoading(true);

    const reminder = {
      title: formState.title,
      date: dayjs(formState.date).format('DD-MM-YYYY'),
      time: dayjs(formState.time).format('HH:mm'),
    };

    dispatch(updateItem({ ...item, reminder }));

    await firestore().collection('items').doc(item.id).update({ reminder });

    setLoading(false);
    disclose.close();
  };

  return (
    <View className="flex-1">
      {item?.reminder ? (
        <View
          className="flex-1 rounded-lg"
          style={{ backgroundColor: theme.colors.primary }}>
          <TouchableRipple
            onPress={disclose.open}
            rippleColor={theme.colors.onPrimary}>
            <View
              className="w-100 justify-center items-center rounded-lg aspect-square"
              style={{ rowGap: 8 }}>
              <MaterialIcons
                name="notifications-active"
                size={30}
                color={theme.colors.onPrimary}
              />
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.onPrimary }}>
                {item.reminder.title}
              </Text>
              <Text
                variant="bodyLarge"
                style={{ color: theme.colors.onPrimary }}>
                {item.reminder.date} {item.reminder.time}
              </Text>
            </View>
          </TouchableRipple>
        </View>
      ) : (
        <ItemActionButton
          icon="add-alert"
          text="Add Reminder"
          onPress={disclose.open}
        />
      )}
      <Portal>
        <Modal
          visible={disclose.isOpen}
          onDismiss={disclose.close}
          dismissable={!loading}>
          <View
            className="m-4 p-4 rounded-xl"
            style={{ backgroundColor: theme.colors.secondaryContainer }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text variant="headlineMedium">
                {item?.reminder ? 'Edit' : 'Add'} Reminder
              </Text>
              <IconButton
                icon="close"
                rippleColor="rgba(0, 0, 0, .32)"
                iconColor={theme.colors.onSurface}
                onPress={disclose.close}
                disabled={loading}
              />
            </View>
            <View style={{ rowGap: 12 }}>
              <TextInput
                label="Title"
                mode="outlined"
                className="w-full"
                placeholder="Title for this Reminder"
                value={formState.title}
                onChangeText={onChange('title')}
                disabled={loading}
              />

              {/* Date */}
              <TouchableOpacity
                onPress={() =>
                  DateTimePickerAndroid.open({
                    value: new Date(),
                    mode: 'date',
                    onChange: (_, selectedDate) => {
                      const currentDate = selectedDate || formState.date;
                      onChange('date')(currentDate);
                    },
                  })
                }
                disabled={loading}>
                <TextInput
                  label="Date"
                  mode="outlined"
                  className="w-full"
                  placeholder="DD/MM/YYYY"
                  value={
                    formState.date
                      ? dayjs(formState.date).format('DD/MM/YYYY')
                      : ''
                  }
                  right={
                    formState.date && (
                      <TextInput.Icon
                        icon="close"
                        onPress={() => onChange('date')(null)}
                      />
                    )
                  }
                  editable={false}
                  disabled={loading}
                />
              </TouchableOpacity>

              {/* Time */}
              <TouchableOpacity
                onPress={() =>
                  DateTimePickerAndroid.open({
                    value: new Date(),
                    mode: 'time',
                    onChange: (_, selectedDate) => {
                      const currentDate = selectedDate || formState.time;
                      onChange('time')(currentDate);
                    },
                  })
                }
                disabled={loading}>
                <TextInput
                  label="Time"
                  mode="outlined"
                  className="w-full"
                  placeholder="HH:MM AM/PM"
                  value={
                    formState.time
                      ? dayjs(formState.time).format('hh:mm A')
                      : ''
                  }
                  right={
                    formState.time && (
                      <TextInput.Icon
                        icon="close"
                        onPress={() => onChange('time')(null)}
                      />
                    )
                  }
                  editable={false}
                  disabled={loading}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row mt-5 mb-2" style={{ columnGap: 12 }}>
              <Button
                mode="outlined"
                className="flex-1"
                onPress={disclose.close}
                disabled={loading}>
                Cancel
              </Button>
              <Button
                mode="contained"
                className="flex-1"
                onPress={onCreate}
                disabled={loading}
                loading={loading}>
                Save
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
