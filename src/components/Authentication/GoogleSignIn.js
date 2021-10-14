import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {GoogleSignin as GSign} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

GSign.configure({
  webClientId:
    '970148480104-cib2hl3jkfkvn84h38ia65ml9t791raf.apps.googleusercontent.com',
});

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#3f7ee8',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 20,
  },
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GSign.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignIn() {
  return (
    <View>
      <Pressable
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
        style={styles.button}>
        <View style={styles.row}>
          <Icon size={20} name="google" color={'#fff'} style={styles.icon} />
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default GoogleSignIn;
