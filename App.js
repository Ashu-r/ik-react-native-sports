import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import Drills from './src/components/Drills';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import TeamMain from './src/components/Teams';
import SignUp from './src/components/Authentication/SignUp';
import SignIn from './src/components/Authentication/SignIn';
import UserInfo from './src/components/UserInfo';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(u) {
    setUser(u);
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
          <Drawer.Navigator initialRouteName="Drills">
            <Drawer.Screen name="Drills" component={Drills} />
            <Drawer.Screen name="Team" component={TeamMain} />
            <Drawer.Screen
              name="UserInfo"
              component={UserInfo}
              initialParams={{
                name: user?.displayName,
                email: user?.email,
              }}
            />
            <Drawer.Screen name="Sign out" component={SignOut} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Sign Up">
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
    navigation.navigate('Skills');
  }, []);
  return <Text>Logging out</Text>;
};

export default App;
