import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const dimension = {
  width: window.width < window.height ? window.width : window.height,
  height: window.width < window.height ? window.height : window.width
};

const Metrics = {
  touchableOpacity: 0.8,
  padding: {
    mini: 5,
    tiny: 10,
    small: 15,
    normal: 20,
    large: 25
  },
  buttonHeight: {
    tiny: 28,
    small: 40,
    normal: 50,
    large: 60
  },
  dimension
};

export default Metrics;
