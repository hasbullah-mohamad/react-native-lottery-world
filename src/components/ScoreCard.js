import React, { Component } from 'react';
import { Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import { Colors, Fonts, Metrics } from '../theme';
import AppHelper from '../helpers/AppHelper';
import { NumbersStandard, NumbersCircle } from './Numbers';

const styles = {
  scoreCard: {
    backgroundColor: Colors.scoreCardBackground,
    borderColor: Colors.scoreCardBorder,
    borderBottomWidth: 1,
    padding: Metrics.paddingDefault
  },
  scoreCardDateContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.marginDefault * 0.7
  },
  scoreCardDate: {
    marginRight: Metrics.marginDefault,
    paddingHorizontal: Metrics.paddingDefault,
    borderRadius: Metrics.paddingDefault
  },
  scoreCardDateText: {
    color: Colors.scoreCardDateText,
    fontSize: Fonts.size.default
  }
};

class ScoreCard extends Component {
  render() {
    const { mode, data } = this.props;
    const isRecentlyUpdated = AppHelper.isRecentlyUpdated(data.date);

    let scoreView = null;
    if (data.score) {
      if (mode === 'text') {
        scoreView = data.score.map((item, index) => (
          <NumbersStandard numbers={item} isRecentlyUpdated={isRecentlyUpdated} key={`${index}`} />
        ));
      } else {
        scoreView = data.score.map((item, index) => (
          <NumbersCircle numbers={item} isRecentlyUpdated={isRecentlyUpdated} key={`${index}`} />
        ));
      }
    }
    return (
      <View style={styles.scoreCard}>
        <View style={[styles.scoreCardDateContainer]}>
          <View style={[styles.scoreCardDate, { backgroundColor: isRecentlyUpdated ? Colors.scoreCardDateBackgroundHighlight : Colors.scoreCardDateBackground }]}>
            <Text style={styles.scoreCardDateText}>{data.date}</Text>
          </View>
          {
            data.delay ? (
              <View style={[styles.scoreCardDate, { backgroundColor: Colors.scoreCardDateBackgroundHighlight }]}>
                <Text style={styles.scoreCardDateText}>{I18n.t('delayed')}</Text>
              </View>
            ) : null
          }
          {
            data.no_game_today ? (
              <View style={[styles.scoreCardDate, { backgroundColor: Colors.scoreCardDateBackgroundHighlight }]}>
                <Text style={styles.scoreCardDateText}>{I18n.t('no_game_today')}</Text>
              </View>
            ) : null
          }
        </View>
        {scoreView}
      </View>
    );
  }
}

export default ScoreCard;
