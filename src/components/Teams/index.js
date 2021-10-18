import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './Card';
import TeamLeaderboard from './TeamLeaderboard';
import TrainingPieChart from './TrainingPieChart';

const data = {
  name: 'Team Name',
  members: [
    {name: 'A B'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
    {name: 'FirstName LastName'},
  ],
  sessions: [
    {
      name: 'Session Name',
      drills: 10,
      duration: 40,
      time: new Date(),
      completed: 5,
    },
    {
      name: 'Session Name',
      drills: 10,
      duration: 40,
      time: new Date(),
      completed: 5,
    },
    {
      name: 'Session Name',
      drills: 10,
      duration: 40,
      time: new Date(),
      completed: 5,
    },
    {
      name: 'Session Name',
      drills: 10,
      duration: 40,
      time: new Date(),
      completed: 5,
    },
  ],
  leaderboard: {
    timeTrained: [
      {
        name: 'FirstName LastName',
        value: 22.4,
      },
      {
        name: 'FirstName LastName',
        value: 18.3,
      },
      {
        name: 'FirstName LastName',
        value: 18.1,
      },
      {
        name: 'FirstName LastName',
        value: 17.6,
      },
    ],
    reactionTime: [
      {
        name: 'FirstName LastName',
        value: 240,
      },
      {
        name: 'FirstName LastName',
        value: 500,
      },
      {
        name: 'FirstName LastName',
        value: 230,
      },
      {
        name: 'FirstName LastName',
        value: 700,
      },
    ],
    accuracy: [
      {
        name: 'FirstName LastName',
        value: 91,
      },
      {
        name: 'FirstName LastName',
        value: 90,
      },
      {
        name: 'FirstName LastName',
        value: 85,
      },
      {
        name: 'FirstName LastName',
        value: 70,
      },
    ],
  },
  trainingBreakdown: [
    {name: 'Soccer', totalTime: 42},
    {name: 'Custom drills', totalTime: 28},
    {name: 'Cognitive fitness', totalTime: 18},
    {name: 'Agility', totalTime: 12},
  ],
};

const styles = StyleSheet.create({
  teamMain: {backgroundColor: '#fff'},
  sectionTitle: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '500',
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row'},
  teamProfile: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  teamTitle: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  smallImageTeam: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  subTitle: {
    marginTop: 5,
  },
  subTitleText: {
    marginLeft: 20,
    fontSize: 15,
  },
  sectionSubtitle: {
    fontSize: 17,
  },
});

const TeamMain = () => {
  const dispatch = useDispatch();
  const teamData = useSelector(state => state.teams.data);
  useEffect(() => {
    dispatch({type: 'INIT_TEAM', payload: data});
  }, [dispatch]);
  if (Object.keys(teamData).length < 1) return null;
  return (
    <ScrollView>
      <View style={styles.teamMain}>
        <View style={styles.center}>
          <Image
            style={styles.teamProfile}
            source={{
              uri: 'https://images.unsplash.com/photo-1499540633125-484965b60031',
            }}
          />
          <Text style={styles.teamTitle}>{teamData.name}</Text>
          <View style={[styles.row, styles.subTitle]}>
            {teamData.members.slice(0, 5).map((member, i) => (
              <Image
                source={{
                  uri: `https://randomuser.me/api/portraits/men/${i}.jpg`,
                }}
                style={styles.smallImageTeam}
                key={i}
              />
            ))}
            <Text style={styles.subTitleText}>
              {teamData.members?.length} members
            </Text>
          </View>
          <Text>
            <Icon size={20} name="pencil" />
            {'  '}Edit team
          </Text>
        </View>
        <View>
          <Text style={[styles.center, styles.sectionTitle]}>
            Team sessions{' '}
            <Icon color={'#ed7a50'} size={20} name="plus-circle" />
          </Text>
          <ScrollView horizontal={true}>
            {teamData.sessions.map((s, i) => (
              <Card key={i} session={s} />
            ))}
          </ScrollView>
          <Text style={[styles.center, styles.sectionSubtitle]}>
            View all sessions{' '}
            <Icon color={'#ed7a50'} size={20} name="arrow-right-thick" />
          </Text>
        </View>
        <View>
          <Text style={[styles.center, styles.sectionTitle]}>
            Team Leaderboard
          </Text>
          <TeamLeaderboard data={teamData.leaderboard} />
          <Text style={[styles.center, styles.sectionSubtitle]}>
            View all leaderboard{' '}
            <Icon color={'#ed7a50'} size={20} name="arrow-right-thick" />
          </Text>
        </View>
        <View>
          <Text style={[styles.center, styles.sectionTitle]}>
            Training Breakdown
          </Text>
          <TrainingPieChart data={teamData.trainingBreakdown} />
        </View>
      </View>
    </ScrollView>
  );
};
export default TeamMain;
