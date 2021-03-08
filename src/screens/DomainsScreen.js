import React, { Component } from 'react';
import {
  ScrollView, View, Text, Linking
} from 'react-native';
import { connect } from 'react-redux';

import {
  Metrics, Styles, Fonts, Colors
} from '../theme';
import CONFIG from '../config';
import Api from '../apis';
import { setSplashing, increaseRewarded } from '../actions/global';
import DomainItem from '../components/DomainItem';
import NavigationTitle from '../components/NavigationTitle';
// import NavigationButton from '../components/NavigationButton';

const styles = {
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: Metrics.padding.tiny
  },
  listItem: {
    width: (Metrics.dimension.width) / 2 - Metrics.padding.tiny,
    padding: Metrics.padding.tiny
  },
  privacy: {
    color: Colors.text,
    fontSize: Fonts.size.h6,
    marginVertical: Metrics.padding.small,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class DomainsScreen extends Component {
  static navigationOptions = ({
    headerTitle: <NavigationTitle aspectRatio={4} />
  })

  async componentWillMount() {
    const domainSaved = await Api.loadDomain();
    if (domainSaved) {
      const { config } = this.props.global;
      const { domains } = config;
      for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];
        if (domain.country === domainSaved.country) {
          this.props.navigation.navigate('companies', { domain });
          break;
        }
      }
    } else {
      this.props.setSplashing(false);
    }
  }

  async handleDomainItemPress(domain) {
    await Api.saveDomain(domain);
    this.props.navigation.navigate('companies', { domain });
    this.props.increaseRewarded(false);
  }

  render() {
    const { config } = this.props.global;

    return (
      <View style={[Styles.container, Styles.bg]}>
        <ScrollView style={[Styles.container]}>
          <View style={styles.list}>
            {
              config && config.domains && config.domains.map((domain, index) => (
                <View style={styles.listItem} key={`${index}`}>
                  <DomainItem data={domain} onPress={this.handleDomainItemPress.bind(this)} />
                </View>
              ))
            }
          </View>
        </ScrollView>
        <Text
          style={[
            styles.privacy
          ]}
        >
          <Text
            onPress={() => Linking.openURL(CONFIG.PRIVACY_URL)}>
            Política de Privacidad
          </Text>
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setSplashing: splashing => dispatch(setSplashing(splashing)),
  increaseRewarded: initialize => dispatch(increaseRewarded(initialize))
});

export default connect(mapStateToProps, mapDispatchToProps)(DomainsScreen);
