import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Metrics, Fonts, Colors } from '../theme';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  icon: {
    color: Colors.navigationText,
    fontSize: Fonts.size.h3
  }
};

const NavigationButton = (props) => {
  const {
    onPress, icon
  } = props;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={Metrics.touchableOpacity} onPress={onPress}>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

NavigationButton.defaultProps = {
  onPress: () => {}
};

export default NavigationButton;
