import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  legend: {
    paddingLeft: 20,
    width: '45%',
    justifyContent: 'space-evenly',
  },
  bold: {
    fontWeight: '600',
  },
  legendColor: {
    alignSelf: 'center',
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 6,
  },
});

const TrainingPieChart = ({data}) => {
  const colors = ['#31b679', '#84bbe5', '#ed7b50', '#fdda66'];
  const dataToShow = data.map((d, i) => ({
    ...d,
    color: colors[i],
    legendFontColor: '#000',
    legendFontSize: 13,
  }));
  return (
    <View style={styles.row}>
      <View style={styles.legend}>
        {data.map((d, i) => (
          <View key={i} style={styles.row}>
            <View style={[styles.legendColor, {backgroundColor: colors[i]}]} />
            <Text style={styles.bold}>{d.totalTime}% </Text>
            <Text>{d.name}</Text>
          </View>
        ))}
      </View>
      <PieChart
        data={dataToShow.reverse()}
        width={screenWidth}
        height={220}
        accessor={'totalTime'}
        backgroundColor={'transparent'}
        paddingLeft={'0'}
        center={[10, 10]}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#08130D',
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
        }}
        hasLegend={false}
      />
    </View>
  );
};
export default TrainingPieChart;
