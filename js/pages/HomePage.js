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
import {connect} from "react-redux";
import {BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";

type Props = {};
class App extends Component<Props> {
  /**
  * @Author:Training
  * @Desc:对于Android物理返回键的适配支持
  * @Params:
  */
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  /** * 处理 Android 中的物理返回键 * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android * @returns {boolean} */
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    navigatorUtil.navigation = this.props.navigation;
    return <DynamicTabNavigation />;
  }
}
const mapStateToProps = state=>(
    {
      nav:state.nav
    }
)
export default connect(mapStateToProps)(App);
