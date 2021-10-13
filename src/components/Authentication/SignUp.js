import React, {useState} from 'react';
import {Button, Pressable, Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

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
});

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const onSignUp = () => {
    if (!email || !password) {
      setErrorText('Email or password should not be empty!');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('account created'))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorText('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setErrorText('That email address is invalid!');
        } else {
          setErrorText(error.message);
        }
      });
  };
  return (
    <View style={styles.container}>
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
      <Button onPress={onSignUp} title="Sign Up" />
      <Text style={styles.bottomText}>
        Already have an account?{' '}
        <Pressable onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.link}>Sign in</Text>
        </Pressable>
      </Text>
    </View>
  );
};
export default SignUp;
