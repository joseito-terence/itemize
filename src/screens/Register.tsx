/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, View } from 'react-native';
import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native-paper';

export default function Register() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key: keyof typeof credentials) => (value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const register = () => {};

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/footsteps.png')}
        width={300}
        height={300}
        resizeMode="cover"
        className="w-full h-[300]">
        <View className="flex-1 justify-end p-4 gap-y-3 bg-white/30 ">
          <Text variant="displayLarge" className="font-extrabold">
            Let's Get Started
          </Text>
          <Text variant="titleLarge" className="font-bold">
            {' '}
            Sign in to continue.
          </Text>
        </View>
      </ImageBackground>
      <View className="flex-1 p-4 gap-y-2 items-center">
        <TextInput
          label="Email"
          mode="outlined"
          className="w-full"
          placeholder="Enter your email"
          onChangeText={handleChange('email')}
        />
        <TextInput
          label="Password"
          mode="outlined"
          className="w-full mb-2"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={handleChange('password')}
        />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          className="w-full mb-2"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={handleChange('confirmPassword')}
        />
        <Button
          mode="contained"
          className="rounded-lg w-full"
          onPress={register}
          labelStyle={{ fontSize: 16 }}>
          Register
        </Button>

        <Text className="py-2 font-bold ">- OR -</Text>

        <Button
          mode="outlined"
          className="rounded-lg w-full"
          icon="google"
          onPress={register}
          labelStyle={{ fontSize: 16 }}>
          Continue with Google
        </Button>

        <Button
          mode="outlined"
          className="rounded-lg w-full"
          icon="apple"
          onPress={register}
          labelStyle={{ fontSize: 16 }}>
          Continue with Apple
        </Button>

        <Text className="py-2 font-bold ">
          Already have an account? Sign In
        </Text>
      </View>
    </View>
  );
}
