/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './js/App';
import AppNavigator from './js/navigator/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
