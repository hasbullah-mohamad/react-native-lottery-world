import React from 'react';
import {
  Image, TouchableOpacity, Text, View
} from 'react-native';

import {
  Colors, Fonts, Metrics
} from '../theme';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1.5,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.border1
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.size.h6,
    fontWeight: Fonts.weight.bold,
    color: Colors.text
  }
};

const CompanyItem = (props) => {
  const { data } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={Metrics.touchableOpacity}
      onPress={() => { props.onPress(data); }}>
      {
        data.logo ? (
          <Image style={styles.image} resizeMode="cover" source={{ uri: data.logo }} />
        ) : (
          <View style={styles.content}>
            <Text style={styles.text}>{data.title}</Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
};

CompanyItem.defaultProps = {
  onPress: () => {}
};

export default CompanyItem;
