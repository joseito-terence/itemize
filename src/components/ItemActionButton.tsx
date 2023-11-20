/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { useTheme, TouchableRipple, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ActionButtonProps {
  icon: string;
  text: string;
  onPress: () => void;
}

const ItemActionButton = ({ icon, text, onPress }: ActionButtonProps) => {
  const theme = useTheme();
  return (
    <View
      className="flex-1 rounded-lg"
      style={{ backgroundColor: theme.colors.primary }}>
      <TouchableRipple onPress={onPress} rippleColor={theme.colors.onPrimary}>
        <View
          className="w-100 justify-center items-center rounded-lg aspect-square"
          style={{ rowGap: 8 }}>
          <MaterialIcons name={icon} size={40} color={theme.colors.onPrimary} />
          <Text variant="bodyLarge" style={{ color: theme.colors.onPrimary }}>
            {text}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default ItemActionButton;
