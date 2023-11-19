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
} from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

interface Props extends ReturnType<typeof useDisclose> {
  item: TItem;
}

export default function ReminderModal({ item, ...props }: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formState, onChange] = useForm({
    title: '',
    date: null,
    time: null,
  });

  const onCreate = async () => {
    setLoading(true);

    // props.close();
  };

  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={props.close}
        dismissable={!loading}>
        <View
          className="m-4 p-4 rounded-xl"
          style={{ backgroundColor: theme.colors.secondaryContainer }}>
          <View className="flex-row items-center justify-between mb-4">
            <Text variant="headlineMedium">Create a Reminder</Text>
            <IconButton
              icon="close"
              rippleColor="rgba(0, 0, 0, .32)"
              iconColor={theme.colors.onSurface}
              onPress={props.close}
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
                  formState.time ? dayjs(formState.time).format('hh:mm A') : ''
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
              onPress={props.close}
              disabled={loading}>
              Cancel
            </Button>
            <Button
              mode="contained"
              className="flex-1"
              onPress={onCreate}
              disabled={loading}
              loading={loading}>
              Create
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
