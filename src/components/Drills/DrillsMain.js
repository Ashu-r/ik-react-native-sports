import React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Card from './Card';
import Filter from './Filter';
import getDrillIcon from '../../utils/getDrillIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  cardGroupText: {
    justifyContent: 'space-between',
  },
  viewAll: {
    marginRight: 20,
  },
  cardGroupTitle: {
    marginLeft: 10,
    alignItems: 'center',
  },
});

const DrillsMain = ({navigation, route}) => {
  const {data} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const stateData = useSelector(state => state.drills.data);
  const filters = useSelector(state => state.drills.filters);
  const favorites = useSelector(state => state.drills.favorites);
  const dispatch = useDispatch();

  const onFilter = k => {
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
              <View style={[styles.row, styles.cardGroupText]}>
                <View style={[styles.row, styles.cardGroupTitle]}>
                  <Icon name={getDrillIcon(k)} size={20} />
                  <Text style={styles.pageSubheadings}>{k}</Text>
                </View>
                <Pressable
                  onPress={() =>
                    navigation.navigate('View All', {
                      drills: data.filter(d => d.sport === k),
                    })
                  }>
                  <Text style={styles.viewAll}>View All</Text>
                </Pressable>
              </View>

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

export default DrillsMain;
