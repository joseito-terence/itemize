/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  useTheme,
  HelperText,
} from 'react-native-paper';
import type { RootStackParamList } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const theme = useTheme();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof credentials) => (value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const signIn = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        navigation.navigate('BottomTabs', { screen: 'Home' });
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
        setLoading(false);
      });
  };

  return (
    <ScrollView className="flex-1">
      <ImageBackground
        source={require('../assets/bg_signin.png')}
        width={300}
        height={300}
        resizeMode="cover"
        className="w-full h-[380]">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['rgba(126, 123, 253, 0.06)', theme.colors.background]}
          style={{ flex: 1 }}>
          <View className="flex-1 justify-end p-4 gap-y-3">
            <Text variant="displayLarge" className="font-extrabold">
              Welcome
            </Text>
            <Text variant="titleLarge" className="font-bold">
              {' '}
              Sign in to continue.
            </Text>
          </View>
        </LinearGradient>
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
        <HelperText type="error" visible={!!error} className="w-full">
          {error}
        </HelperText>
        <Button
          mode="contained"
          className="rounded-lg w-full"
          onPress={signIn}
          loading={loading}
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
          className="flex-row items-center"
          onPress={() => navigation.navigate('Register')}>
          <Text className="py-2 font-bold">Don't have an account? </Text>
          Register
        </Button>
      </View>
    </ScrollView>
  );
}
