/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import type { RootStackParamList } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof credentials) => (value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const register = async () => {
    if (!credentials.email || !credentials.password) {
      setError('Please enter all the fields.');
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (err.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }

        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView className="flex-1">
      <ImageBackground
        source={require('../assets/footsteps.png')}
        width={300}
        height={300}
        resizeMode="cover"
        className="w-full h-[300]">
        <View className="flex-1 justify-end p-4 gap-y-3 bg-white/30 dark:bg-black/60 ">
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
        <HelperText type="error" visible={!!error} className="w-full">
          <>{error}</>
        </HelperText>
        <Button
          mode="contained"
          className="rounded-lg w-full"
          onPress={register}
          loading={loading}
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

        {/* <Button
          mode="outlined"
          className="rounded-lg w-full"
          icon="apple"
          onPress={register}
          labelStyle={{ fontSize: 16 }}>
          Continue with Apple
        </Button> */}

        <Button
          className="flex-row items-center"
          onPress={() => navigation.navigate('Login')}>
          <Text className="py-2 font-bold">Already have an account? </Text>
          Sign In
        </Button>
      </View>
    </ScrollView>
  );
}
