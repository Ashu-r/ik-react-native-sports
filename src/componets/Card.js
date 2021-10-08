import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from 'react-native';
import CircleIndicators from './CircleIndicators';

const styles = StyleSheet.create({
  roundCorners: {
    borderRadius: 10,
  },
  card: {
    backgroundColor: 'white',
    height: 200,
    width: 200,
    margin: 10,
    borderRadius: 20,
  },

  cardBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
  },
  cardText: {
    marginTop: 'auto',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
  },
  cartSubtitle: {
    color: '#ccc',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
  },
  indicators: {
    marginLeft: 10,
  },
});

const Card = ({d}) => {
  const getLevelText = l => {
    switch (l) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
    }
  };
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.cardBackground}
        source={{
          uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
        }}
        imageStyle={styles.roundCorners}
        resizeMode="cover">
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{d.title}</Text>
          <View style={styles.row}>
            <Text style={styles.cartSubtitle}>{getLevelText(d.level)}</Text>
            <View style={[styles.row, styles.indicators]}>
              <CircleIndicators level={d.level} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Card;
