import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import Main from './src/components/Drills/Main';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import TeamMain from './src/components/Teams/TeamMain';
import SignUp from './src/components/Authentication/SignUp';
import SignIn from './src/components/Authentication/SignIn';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? (
          <Drawer.Navigator initialRouteName="Team">
            <Drawer.Screen name="Skills" component={Main} />
            <Drawer.Screen name="Team" component={TeamMain} />
            <Drawer.Screen name="Sign out" component={SignOut} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="SignUp">
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Sign In" component={SignIn} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
};

const SignOut = ({navigation}) => {
  useEffect(() => {
    auth().signOut();
    navigation.navigate('Sign In');
  }, []);
  return <Text>Logging out</Text>;
};

export default App;
