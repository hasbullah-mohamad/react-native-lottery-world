import React from 'react';
import { View, Image } from 'react-native';
import { Images, Styles } from '../theme';
import LoadingIndicator from '../components/LoadingIndicator';

const SplashScreen = () => (
  <View style={Styles.container}>
    <Image style={Styles.fill} source={Images.splash} resizeMode="cover" />
    <LoadingIndicator fill />
  </View>
);

export default SplashScreen;
