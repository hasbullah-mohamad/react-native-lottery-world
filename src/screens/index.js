import React, { Component } from 'react';
import { NetInfo, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import DropdownAlert from 'react-native-dropdownalert';
import ExitApp from 'react-native-exit-app';
import I18n from 'react-native-i18n';

import { Styles } from '../theme';
import Api from '../apis';
import { setConfig, increaseRewarded } from '../actions/global';
import Splash from './SplashScreen';
import DomainsScreen from './DomainsScreen';
import CompaniesScreen from './CompaniesScreen';
import CompanyScreen from './CompanyScreen';
import GameScreen from './GameScreen';
import CONFIG from '../config';

const { Banner, AdRequest } = firebase.admob;

const MainNavigator = createStackNavigator({
  domains: {
    screen: DomainsScreen
  },
  companies: {
    screen: CompaniesScreen
  },
  company: {
    screen: CompanyScreen
  },
  game: {
    screen: GameScreen
  }
}, {
  navigationOptions: {
    headerStyle: Styles.navigationHeader
  }
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      rewardedCount: props.global && props.global.rewardedCount ? props.global.rewardedCount : 0
    };
  }

  async componentDidMount() {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectionChange.bind(this)
    );
    SplashScreen.hide();
    const config = await Api.getConfig();
    if (config === null) {
      this.alertWithType('error', I18n.t('error'), I18n.t('there_is_no_internet_connection'));
      setTimeout(() => {
        ExitApp.exitApp();
      }, 2000);
    }
    this.props.setConfig(config);
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
      this.requestInterstitial();
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    const { global } = nextProps;
    if (global.rewardedCount >= CONFIG.ADMOB.REWARDED_MAX) {
      if (this.state.rewardedCount !== global.rewardedCount) {
        this.setState({
          rewardedCount: global.rewardedCount
        });
        setTimeout(() => {
          this.showInterstitial();
        }, 100);
      }
    }
  }

  requestInterstitial() {
    const request = new AdRequest();
    request.addKeyword('interstitial');
    this.interstitial = firebase.admob().interstitial(CONFIG.ADMOB.SECRETS.INTERSTITIAL);
    this.interstitial.on('onAdLoaded', () => {
      console.log('interstitial has been loaded.');
    });

    this.interstitial.on('onAdClosed', () => {
      console.log('interstitial has been closed.');
      this.props.increaseRewarded(true);
      this.requestInterstitial();
    });
    this.interstitial.loadAd(request.build());
  }

  showInterstitial() {
    if (this.interstitial && this.interstitial.isLoaded()) {
      firebase.analytics().logEvent('interstitial', { showRewarded: true });
      this.interstitial.show();
    }
  }

  alertWithType(type, title, message) {
    this.alert.alertWithType(type, title, message);
  }

  handleConnectionChange(connectionInfo) {
    if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
      this.alertWithType('error', I18n.t('error'), I18n.t('there_is_no_internet_connection'));
      setTimeout(() => {
        ExitApp.exitApp();
      }, 2000);
    }
  }

  renderMain() {
    return (
      <View style={Styles.container}>
        <MainNavigator ref={(navigator) => { this.navigator = navigator; }} />
        <Banner
          key={this.state.rewardedCount === CONFIG.ADMOB.REWARDED_MAX}
          unitId={CONFIG.ADMOB.SECRETS.BANNER}
          request={new AdRequest().build()}
          onAdLoaded={() => {
            console.log('banner has ben loaded.');
          }}
        />
      </View>
    );
  }

  render() {
    const { isLoaded } = this.state;
    const { splashing } = this.props.global;
    return (
      <View style={Styles.container}>
        {isLoaded && this.renderMain()}
        {
          splashing && (
            <View style={Styles.fill}>
              <Splash />
            </View>
          )
        }
        <DropdownAlert ref={(ref) => { this.alert = ref; }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  global: state.get('global')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setConfig: config => dispatch(setConfig(config)),
  increaseRewarded: initialize => dispatch(increaseRewarded(initialize))
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
