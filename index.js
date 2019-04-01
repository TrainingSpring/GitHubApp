/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppNavigator from './js/navigator/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
