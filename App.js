import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './src/i18n';
import Screen from './src/screens';
import configureStore from './src/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Screen />
      </Provider>
    );
  }
}

export default App;
