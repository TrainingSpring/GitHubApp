/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import navigatorUtil from "../Util/navigatorUtil"
import DynamicTabNavigation from '../navigator/DynamicTabNavigation'


type Props = {};
class App extends Component<Props> {

  render() {
    navigatorUtil.navigation = this.props.navigation;
    return <DynamicTabNavigation />;
  }
}

const styles = StyleSheet.create({

});
export default App;
