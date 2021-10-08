import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
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
  optionSelected: {
    color: 'white',
    backgroundColor: 'black',
  },
  optionUnselected: {
    backgroundColor: '#eee',
  },
});

const Filter = ({onFilter, isFavorite, setIsFavorite}) => {
  const stateData = useSelector(state => state.data);
  const filterSelected = useSelector(state => state.filters);
  return (
    <View style={styles.row}>
      <View style={styles.filterOption}>
        <Pressable onPress={() => setIsFavorite(fav => !fav)}>
          <Text
            style={[
              styles.filterOptionText,
              isFavorite ? styles.optionSelected : styles.optionUnselected,
            ]}>
            Favorites
          </Text>
        </Pressable>
      </View>
      {Object.keys(stateData).map(k => (
        <View key={k} style={styles.filterOption}>
          <Pressable onPress={() => onFilter(k)}>
            <Text
              style={[
                styles.filterOptionText,
                filterSelected.includes(k)
                  ? styles.optionSelected
                  : styles.optionUnselected,
              ]}>
              {k}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default Filter;
