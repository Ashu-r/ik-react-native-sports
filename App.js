import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import Main from './src/components/Drills/Main';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TeamMain from './src/components/Teams/TeamMain';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Team">
          <Drawer.Screen name="Skills" component={Main} />
          <Drawer.Screen name="Team" component={TeamMain} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
