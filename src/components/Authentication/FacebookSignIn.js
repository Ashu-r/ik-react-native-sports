import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Pressable, Text} from 'react-native';

import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 20,
  },
  or: {
    fontSize: 17,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

function FacebookSignIn() {
  return (
    <View>
      <Pressable
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
        style={styles.button}>
        <View style={styles.row}>
          <Icon size={20} name="facebook" color={'#fff'} style={styles.icon} />
          <Text style={styles.buttonText}>Sign In with Facebook</Text>
        </View>
      </Pressable>
      <Text style={styles.or}>Or</Text>
    </View>
  );
}

export default FacebookSignIn;
