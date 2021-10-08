import React, {useEffect} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from './Card';
import groupBy from '../utils/groupBy';
import Filter from './Filter';

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
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  pageHeading: {
    fontSize: 25,
    fontWeight: '800',
    marginLeft: 10,
    marginBottom: 15,
  },
  pageSubheadings: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  cardGroup: {
    marginBottom: 40,
  },
});

const Main = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const stateData = useSelector(state => state.data);
  const filters = useSelector(state => state.filters);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'INIT_DRILLS', payload: groupBy(data, 'sport')});
  }, [dispatch]);

  const onFilter = k => {
    console.log(k);
    filters.includes(k)
      ? dispatch({type: 'REMOVE_FILTER', payload: k})
      : dispatch({type: 'ADD_FILTER', payload: k});
  };

  const getDrillById = id => {
    return data.find(d => d.id === id);
  };
  const filtersToShow =
    filters.length === 0 ? [...new Set(data.map(d => d.sport))] : filters;

  if (!stateData) return <Text>Loading</Text>;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.pageHeading}>Filter</Text>
        <Filter
          onFilter={onFilter}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />
        <Text style={styles.pageHeading}>TRAIN YOUR SKILLS</Text>
        {isFavorite ? (
          <View style={styles.cardGroup}>
            <Text style={styles.pageSubheadings}>Favorites</Text>
            <ScrollView horizontal={true}>
              {favorites.map((id, i) => (
                <Card key={i} drill={getDrillById(id)} />
              ))}
            </ScrollView>
          </View>
        ) : (
          filtersToShow.map(k => (
            <View key={k} style={styles.cardGroup}>
              <Text style={styles.pageSubheadings}>{k}</Text>
              <ScrollView horizontal={true}>
                {stateData[k]?.map((id, i) => (
                  <Card key={i} drill={getDrillById(id)} />
                ))}
              </ScrollView>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Main;
