import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from 'react-native-i18n';

import { Colors, Metrics, Fonts } from '../theme';

const styles = {
  container: {
    backgroundColor: Colors.navigationBackground,
    borderRadius: 3,
    flexDirection: 'row',
    padding: Metrics.padding.tiny
  },
  text: {
    color: Colors.navigationText,
    flex: 1,
    fontSize: Fonts.size.h6,
    fontWeight: Fonts.weight.bold,
    textAlign: 'center'
  },
  icon: {
    color: Colors.navigationText,
    fontSize: Fonts.size.h5,
    paddingHorizontal: Metrics.padding.mini
  }
};

class GameSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
      // date: props.date ? props.date : null
    };
  }

  showDateTimePicker() {
    this.setState({
      isDateTimePickerVisible: true
    });
  }

  hideDateTimePicker() {
    this.setState({
      isDateTimePickerVisible: false
    });
  }

  handleDatePicked(date) {
    // this.setState({
    //   date
    // });
    this.props.onChangeDate(date);
    this.hideDateTimePicker();
  }

  render() {
    const {
      isDateTimePickerVisible
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text style={styles.title}>{I18n.t('previous_result')}</Text>
        </Text>
        <TouchableOpacity onPress={this.showDateTimePicker.bind(this)}>
          <Icon name="calendar-alt" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onRefresh}>
          <Icon name="sync-alt" style={styles.icon} />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked.bind(this)}
          onCancel={this.hideDateTimePicker.bind(this)}
        />
      </View>
    );
  }
}

GameSearchBar.defaultProps = {
  onChangeDate: () => {},
  onRefresh: () => {}
};

export default GameSearchBar;
