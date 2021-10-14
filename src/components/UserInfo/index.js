import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 20,
    padding: 10,
  },
});

const UserInfo = ({route}) => {
  return (
    <View>
      <Text style={styles.text}>Name: {route.params.name}</Text>
      <Text style={styles.text}>Email: {route.params.email}</Text>
    </View>
  );
};

export default UserInfo;
