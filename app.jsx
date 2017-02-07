import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './app/index';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root-container')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app/index', () => {
    render(App)
  });
}