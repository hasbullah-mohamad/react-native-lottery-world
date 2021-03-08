import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors, Styles } from '../theme';

const styles = {
  container: {
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
const LoadingIndicator = (props) => {
  const { fill, color, backgroundColor } = props;
  const renderIndicator = (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size="small" color={color} />
    </View>
  );

  const containerStyle = fill ? [Styles.fill, Styles.justifyContentCenter, Styles.alignItemsCenter] : Styles.justifyContentCenter;
  return (
    <View style={containerStyle}>
      {renderIndicator}
    </View>
  );
};

LoadingIndicator.defaultProps = {
  fill: false,
  color: Colors.activityIndicator,
  backgroundColor: Colors.activityIndicatorBackground
};

export default LoadingIndicator;
