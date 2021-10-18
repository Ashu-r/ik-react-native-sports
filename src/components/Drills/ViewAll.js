import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Card from './Card';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

const ViewAll = ({route}) => {
  const {drills} = route.params;
  console.log(drills);
  return (
    <ScrollView style={styles.container}>
      {drills.map(d => (
        <Card key={d.id} drill={d} direction="vertical" />
      ))}
    </ScrollView>
  );
};

export default ViewAll;
