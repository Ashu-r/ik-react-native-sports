import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: '#eee',
    height: 180,
    width: 230,
    margin: 10,
    borderRadius: 5,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  textMuted: {
    fontSize: 15,
    color: 'grey',
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

const getTime = time => {
  const day = isToday(time) ? 'Today' : format(time, 'd-MMM');
  const timestamp = format(time, 'hh:mm aa');
  return day + ' @ ' + timestamp;
};

const Card = ({session}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{session.name}</Text>
      <Text style={styles.textMuted}>{session.drills} drills</Text>
      <Text style={styles.textMuted}>{session.duration} mins</Text>
      <View style={styles.hr} />
      <Text style={styles.textMuted}>{getTime(session.time)}</Text>
      <View style={styles.hr} />
      <Text style={styles.cardTitle}>Completed</Text>
      <Text style={styles.textMuted}>
        {session.completed} of {session.drills} members
      </Text>
    </View>
  );
};

export default Card;
