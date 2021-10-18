import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrillsMain from './DrillsMain';
import ViewAll from './ViewAll';
import groupBy from '../../utils/groupBy';
import {useDispatch} from 'react-redux';
import DrillsCategories from './DrillsCategories';

const data = [
  {id: 1, sport: 'soccer', title: 'Soccer jumping practice test', level: 1},
  {id: 2, sport: 'soccer', title: 'Soccer jumping practice 2 test', level: 2},
  {id: 3, sport: 'soccer', title: 'Soccer jumping practice 3 test', level: 3},
  {id: 4, sport: 'soccer', title: 'Soccer jumping practice 4 test', level: 1},
  {id: 5, sport: 'cognitive', title: 'Test Title', level: 1},
  {id: 6, sport: 'cognitive', title: 'Test Title 2', level: 2},
  {id: 7, sport: 'cognitive', title: 'Test Title 3', level: 3},
  {id: 8, sport: 'cognitive', title: 'Test Title 4', level: 1},
  {id: 9, sport: 'agility', title: 'Test Title', level: 1},
  {id: 10, sport: 'agility', title: 'Test Title 2', level: 2},
  {id: 11, sport: 'agility', title: 'Test Title 3', level: 3},
  {id: 12, sport: 'agility', title: 'Test Title 4', level: 1},
  {id: 9, sport: 'basketball', title: 'Test Title', level: 1},
  {id: 10, sport: 'basketball', title: 'Test Title 2', level: 2},
  {id: 11, sport: 'basketball', title: 'Test Title 3', level: 3},
  {id: 12, sport: 'basketball', title: 'Test Title 4', level: 1},
];

const Stack = createNativeStackNavigator();

const Drills = () => {
  const dispatch = useDispatch();
  const initialRouteName =
    Math.floor(Math.random() * 100) % 2 === 0
      ? 'DrillsMain'
      : 'Drill Categories';
  useEffect(() => {
    dispatch({type: 'INIT_DRILLS', payload: groupBy(data, 'sport')});
  }, [dispatch]);
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Drill Categories"
        component={DrillsCategories}
        initialParams={{data}}
      />
      <Stack.Screen
        name="DrillsMain"
        component={DrillsMain}
        options={{headerShown: false}}
        initialParams={{data}}
      />
      <Stack.Screen name="View All" component={ViewAll} />
    </Stack.Navigator>
  );
};

export default Drills;
