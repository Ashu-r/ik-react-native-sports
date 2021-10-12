import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  circleIndicator: {
    alignSelf: 'center',
    marginHorizontal: 2,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

const CircleIndicators = ({level}) => {
  const indicatorColor = i => {
    if (level - i > 0) {
      return {backgroundColor: 'orange'};
    }
    return {backgroundColor: 'white'};
  };
  return (
    <View style={styles.row}>
      {[...Array(3)].map((e, i) => (
        <View key={i} style={[styles.circleIndicator, indicatorColor(i)]} />
      ))}
    </View>
  );
};

export default CircleIndicators;
