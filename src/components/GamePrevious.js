import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { Metrics, Colors, Fonts } from '../theme';
import { NumbersCircle } from './Numbers';

const styles = {
  container: {
    // paddingVertical: Metrics.padding.tiny
  },
  title: {
    textAlign: 'center',
    color: Colors.text,
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.h4
  },
  results: {
    marginTop: Metrics.padding.tiny
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingVertical: Metrics.padding.mini
  },
  date: {
    color: Colors.textMuted,
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.h6
  },
  result: {
    alignItems: 'center',
    maxWidth: 240
  },
  step: {
    color: Colors.textMuted,
    fontSize: Fonts.size.h6,
    paddingHorizontal: Metrics.padding.mini
  }
};

const GamePrevious = (props) => {
  const {
    data
  } = props;
  const renderResults = [];
  for (let i = 1, ni = data.length; i < ni; i++) {
    const item = data[i];
    const date = moment(item.date, 'DD-MM-YYYY').format('DD/MM');
    const renderResult = (
      <View style={styles.row} key={`${i}`}>
        <Text style={styles.date}>{`${date} | `}</Text>
        <View style={styles.result}>
          {
            item.score.map((numbers, index) => (
              <NumbersCircle numbers={numbers} key={`${index}`} recentlyUpdated={false} disabled size="small" />
            ))
          }
        </View>
      </View>
    );
    renderResults.push(renderResult);
  }
  return (
    <View style={styles.container}>
      <View style={styles.results}>
        {renderResults}
      </View>
    </View>
  );
};

export default GamePrevious;
