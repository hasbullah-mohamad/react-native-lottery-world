import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';

import AppHelper from '../helpers/AppHelper';
import { NumbersCircle, NumbersStandard } from './Numbers';
import { Metrics, Colors, Fonts } from '../theme';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.padding.small
  },
  logo: {
    marginTop: -Metrics.padding.small,
    width: 160,
    height: 90
  },
  title: {
    fontSize: Fonts.size.default,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    marginBottom: Metrics.padding.tiny
  },
  reference: {
    color: Colors.textGray,
    fontSize: Fonts.size.h5,
    fontWeight: Fonts.weight.bold,
    marginTop: Metrics.padding.tiny
  },
  date: {
    fontSize: Fonts.size.h6,
    fontWeight: Fonts.weight.bold,
    color: Colors.textMuted,
    marginTop: Metrics.padding.tiny
  }
};

const GameItem = (props) => {
  const {
    data, onPress
  } = props;

  const {
    info, detail
  } = data;

  let renderScore = null;
  let renderReference = null;

  if (detail) {
    const recentlyUpdated = AppHelper.isRecentlyUpdated(detail.updated_at);
    if (detail.score) {
      if (info.mode === 'text') {
        renderScore = detail.score.map((item, index) => (
          <NumbersStandard numbers={item} recentlyUpdated={recentlyUpdated} key={`${index}`} />
        ));
      } else {
        renderScore = detail.score.map((item, index) => (
          <NumbersCircle numbers={item} recentlyUpdated={recentlyUpdated} key={`${index}`} />
        ));
      }
    }

    if (detail.reference) {
      if (detail.money) {
        renderReference = (<Text style={styles.reference}>{`${detail.reference} ${detail.money}`}</Text>);
      } else {
        renderReference = (<Text style={styles.reference}>{detail.reference}</Text>);
      }
    } else if (detail.money) {
      renderReference = (<Text style={styles.reference}>{detail.money}</Text>);
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={Metrics.touchableOpacity}
      onPress={() => { onPress(data); }}>
      {
        info.logo ? (
          <Image style={styles.logo} source={{ uri: info.logo }} resizeMode="contain" />
        ) : (
          <Text style={styles.title}>{info.title}</Text>
        )
      }
      {renderScore}
      {renderReference}
      <Text style={styles.date}>{detail ? detail.updated_at : info.updated_at}</Text>
    </TouchableOpacity>
  );
};

GameItem.defaultProps = {
  onPress: () => {}
};

export default GameItem;
