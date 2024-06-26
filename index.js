/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import i18next from './src/constants/lang/index';
import store from './src/redux/store';
const RootComponent = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>
);
AppRegistry.registerComponent(appName, () =>
  gestureHandlerRootHOC(RootComponent),
);
