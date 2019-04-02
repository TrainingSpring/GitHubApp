/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialTopTabNavigator,createBottomTabNavigator,createAppContainer} from "react-navigation";
import {Platform, StyleSheet, Text, View} from 'react-native';
import navigatorUtil from "../Util/navigatorUtil"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import PopularPage from './PopularPage'
import FavoritePage from './FavoritePage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'
import DynamicTabNavigation from '../navigator/DynamicTabNavigation'

type Props = {};
export default class App extends Component<Props> {

  render() {
    navigatorUtil.navigation = this.props.navigation;
    return <DynamicTabNavigation />;
  }
}

const styles = StyleSheet.create({

});
