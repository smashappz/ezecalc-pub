import React from 'react';
import {Provider} from 'react-redux';
import {init} from './src/init';
import {Main} from './src/main';
import {store} from './src/store';

init();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
