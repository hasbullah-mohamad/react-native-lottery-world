import React from 'react';
import { View, Image, Text } from 'react-native';
import { Colors, Fonts, Images } from '../theme';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    marginRight: 10
  },
  text: {
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.h6,
    color: Colors.navigationText
  }
};

const NavigationTitle = (props) => {
  const { text, logo, logoAspectRatio } = props;
  const logoStyle = {
    width: logoAspectRatio * 60,
    height: 60
  };

  return (
    <View style={styles.container}>
      {logo && <Image style={[styles.image, logoStyle]} source={logo} resizeMode="contain" />}
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

NavigationTitle.defaultProps = {
  logo: Images.logo,
  logoAspectRatio: 2
};

export default NavigationTitle;
