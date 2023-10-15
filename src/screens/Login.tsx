/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, View } from 'react-native';
import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native-paper';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key: keyof typeof credentials) => (value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const signIn = () => {};

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/bg_signin.png')}
        width={300}
        height={300}
        resizeMode="cover"
        className="w-full h-[380]">
        <View className="flex-1 justify-end p-4 gap-y-3">
          <Text variant="displayLarge" className="font-extrabold">
            Welcome
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
        <Button
          mode="contained"
          className="rounded-lg w-full"
          onPress={signIn}
          labelStyle={{ fontSize: 16 }}>
          Sign In
        </Button>

        <Text className="py-2 font-bold ">- OR -</Text>

        <Button
          mode="outlined"
          className="rounded-lg w-full"
          icon="google"
          onPress={signIn}
          labelStyle={{ fontSize: 16 }}>
          Sign In with Google
        </Button>

        <Button
          mode="outlined"
          className="rounded-lg w-full"
          icon="apple"
          onPress={signIn}
          labelStyle={{ fontSize: 16 }}>
          Sign In with Apple
        </Button>

        <Text className="py-2 font-bold ">Don't have an account? Register</Text>
      </View>
    </View>
  );
}
