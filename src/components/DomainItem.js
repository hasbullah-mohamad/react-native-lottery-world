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
    color: Colors.text,
    fontWeight: Fonts.weight.bold
  }
};

const DomainItem = (props) => {
  const { data } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={Metrics.touchableOpacity}
      onPress={() => { props.onPress(data); }}>
      {
        data.image ? (
          <Image style={styles.image} resizeMode="cover" source={{ uri: data.image }} />
        ) : (
          <View style={styles.content}>
            <Text style={styles.text}>{data.country}</Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
};

DomainItem.defaultProps = {
  onPress: () => {}
};

export default DomainItem;
