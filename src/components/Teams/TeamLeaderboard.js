import React, {useState} from 'react';
import {FlatList, View, StyleSheet, Text, Pressable, Image} from 'react-native';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  rows: {marginTop: 5},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  tabs: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabOption: {
    padding: 10,
  },
  tabOptionSelected: {
    borderBottomWidth: 2,
  },
  textMuted: {
    color: '#888',
  },
  rowsImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  indexText: {
    fontSize: 20,
    fontWeight: '600',
  },
});

const LeaderboardRows = ({allData, tab}) => {
  const data =
    tab === 0
      ? allData.timeTrained
      : tab === 1
      ? allData.reactionTime.sort((a, b) => a.value - b.value)
      : allData.accuracy;
  const getValueUnit = tab => {
    switch (tab) {
      case 0:
        return 'hrs';
      case 1:
        return 'ms';
      case 2:
        return '%';
    }
  };
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <View style={styles.rows}>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.indexText}>{index + 1}</Text>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/men/${index}.jpg`,
            }}
            style={styles.rowsImage}
          />
          <View>
            <Progress.Bar
              color="#82c1ff"
              borderColor="white"
              borderRadius={0}
              height={10}
              progress={item.value / maxValue}
              width={200}
            />
            <Text style={styles.textMuted}>{item.name}</Text>
          </View>
          <Text>
            {item.value} {getValueUnit(tab)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const TeamLeaderboard = ({data}) => {
  const [tabSelected, setTabSelected] = useState(0);
  return (
    <View>
      <View style={styles.tabs}>
        <View style={styles.row}>
          <Pressable
            style={[
              styles.tabOption,
              tabSelected === 0 ? styles.tabOptionSelected : null,
            ]}
            onPress={() => setTabSelected(0)}>
            <Text style={tabSelected === 0 ? null : styles.textMuted}>
              Time trained
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tabOption,
              tabSelected === 1 ? styles.tabOptionSelected : null,
            ]}
            onPress={() => setTabSelected(1)}>
            <Text style={tabSelected === 1 ? null : styles.textMuted}>
              Reaction time
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tabOption,
              tabSelected === 2 ? styles.tabOptionSelected : null,
            ]}
            onPress={() => setTabSelected(2)}>
            <Text style={tabSelected === 2 ? null : styles.textMuted}>
              Accuracy
            </Text>
          </Pressable>
        </View>
      </View>
      <LeaderboardRows allData={data} tab={tabSelected} />
    </View>
  );
};

export default TeamLeaderboard;
