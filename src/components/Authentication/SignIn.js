import React, {useState} from 'react';
import {Button, Pressable, Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import GoogleSignIn from './GoogleSignIn';
import FacebookSignIn from './FacebookSignIn';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  bottomText: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
  },
  link: {
    marginHorizontal: 20,
    color: 'blue',
    fontSize: 20,
    marginBottom: 0,
  },
  errorText: {
    color: 'red',
    paddingBottom: 10,
  },
  signInText: {
    fontSize: 17,
    marginVertical: 10,
  },
});

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const onSignIn = () => {
    if (!email || !password) {
      setErrorText('Email or password should not be empty!');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('signed in'))
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setErrorText(
            'An account with that email does not exist, please sign up',
          );
        } else if (error.code === 'auth/invalid-email') {
          setErrorText('That email address is invalid!');
        } else if (error.code === 'auth/wrong-password') {
          setErrorText('Please enter correct password');
        } else {
          setErrorText(error.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      <GoogleSignIn />
      <FacebookSignIn />
      <Text style={styles.signInText}>Sign in with email</Text>
      <TextInput
        style={[styles.input]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={[styles.input]}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry
      />
      <Text style={styles.errorText}>{errorText}</Text>
      <Button onPress={onSignIn} title="Sign In" />
      <Text style={styles.bottomText}>
        New user?{' '}
        <Pressable onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.link}>Sign up</Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default SignIn;
