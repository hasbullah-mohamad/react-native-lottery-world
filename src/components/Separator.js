import React from 'react';
import { View } from 'react-native';

import { Colors } from '../theme';

const styles = {
  container: {
    width: '100%',
    height: 1
  }
};

const Separator = (props) => {
  const { color } = props;
  return (
    <View style={[styles.container, { backgroundColor: color }]} />
  );
};

Separator.defaultProps = {
  color: Colors.border
};

export default Separator;
