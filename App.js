import React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import Card from './src/componets/Card';

const data = [
  {sport: 'soccer', title: 'Soccer jumping practice test', level: 1},
  {sport: 'soccer', title: 'Soccer jumping practice 2 test', level: 2},
  {sport: 'soccer', title: 'Soccer jumping practice 3 test', level: 3},
  {sport: 'soccer', title: 'Soccer jumping practice 4 test', level: 1},
  {sport: 'cognitive', title: 'Test Title', level: 1},
  {sport: 'cognitive', title: 'Test Title 2', level: 2},
  {sport: 'cognitive', title: 'Test Title 3', level: 3},
  {sport: 'cognitive', title: 'Test Title 4', level: 1},
  {sport: 'agility', title: 'Test Title', level: 1},
  {sport: 'agility', title: 'Test Title 2', level: 2},
  {sport: 'agility', title: 'Test Title 3', level: 3},
  {sport: 'agility', title: 'Test Title 4', level: 1},
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
  filterOption: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  filterOptionText: {
    padding: 10,
    borderRadius: 10,
    textTransform: 'capitalize',
  },
  filterOptionSelected: {
    color: 'white',
    backgroundColor: 'black',
  },
  filterOptionUnselected: {
    backgroundColor: '#eee',
  },
});

const App = () => {
  const [filterSelected, setFilterSelected] = useState([]);

  const groupBy = (arr, property) => {
    return arr.reduce((acc, cur) => {
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {});
  };
  const onFilter = k => {
    filterSelected.includes(k)
      ? setFilterSelected(filterSelected.filter(f => f !== k))
      : setFilterSelected(filterSelected.concat(k));
  };
  const groupedData = groupBy(data, 'sport');
  const dataToShow =
    filterSelected.length === 0 ? Object.keys(groupedData) : filterSelected;
  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>Filter</Text>
      <View style={styles.row}>
        {Object.keys(groupedData).map(k => (
          <View key={k} style={styles.filterOption}>
            <Pressable onPress={() => onFilter(k)}>
              <Text
                style={[
                  styles.filterOptionText,
                  filterSelected.includes(k)
                    ? styles.filterOptionSelected
                    : styles.filterOptionUnselected,
                ]}>
                {k}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
      <Text style={styles.pageHeading}>TRAIN YOUR SKILLS</Text>
      <ScrollView>
        {dataToShow.map(k => (
          <View key={k} style={styles.cardGroup}>
            <Text style={styles.pageSubheadings}>{k}</Text>
            <ScrollView horizontal={true} key={k}>
              {groupedData[k]?.map((d, i) => (
                <Card key={i} d={d} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;
