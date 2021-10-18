import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import getDrillIcon from '../../utils/getDrillIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  category: {
    marginVertical: 10,
    padding: 30,
    flexBasis: '40%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});

const DrillsCategories = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      {[...new Set(data.map(d => d.sport))].map(category => (
        <Pressable
          key={category}
          style={styles.category}
          onPress={() =>
            navigation.navigate('View All', {
              drills: data.filter(d => d.sport === category),
            })
          }>
          <Icon name={getDrillIcon(category)} size={30} />
          <Text>{category}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DrillsCategories;
