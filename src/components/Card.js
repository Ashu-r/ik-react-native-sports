import React from 'react';
import {ImageBackground, Text, View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
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
  starIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
});

const Card = ({drill}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isThisFavorite = favorites.includes(drill.id);
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
  const onFavorite = () => {
    isThisFavorite
      ? dispatch({type: 'REMOVE_FAV', payload: drill.id})
      : dispatch({type: 'ADD_FAV', payload: drill.id});
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
        <View>
          <Pressable onPress={onFavorite}>
            <Icon
              style={styles.starIcon}
              name={isThisFavorite ? 'star' : 'star-outline'}
              size={30}
              color={isThisFavorite ? 'orange' : 'white'}
            />
          </Pressable>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{drill.title}</Text>
          <View style={styles.row}>
            <Text style={styles.cartSubtitle}>{getLevelText(drill.level)}</Text>
            <View style={[styles.row, styles.indicators]}>
              <CircleIndicators level={drill.level} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Card;
