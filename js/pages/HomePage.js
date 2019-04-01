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

type Props = {};
export default class App extends Component<Props> {
  /**
   * @desc  使用navigation中的createBottomTabNavigator
   *        创建一个底部导航navBar,并将其返回出来
   *        以便于createAppContainer的使用
   * @returns {NavigationContainer}
   * @private
   */
  _createNavBar(){
    return  createBottomTabNavigator({
      PopularPage:{
        screen:PopularPage,
        navigationOptions:{
          tabBarLabel:"Popular",
          tabBarIcon:({tintColor,focused})=>(
              <MaterialIcons
                  name={'whatshot'}
                  size={26}
                  style={{color:tintColor}}
              />
          )
        }
      },
      TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
          tabBarLabel:"Trending",
          tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                  name={'trending-up'}
                  size={26}
                  style={{color:tintColor}}
                />
          )
        }
      },
      FavoritePage:{
        screen:FavoritePage,
        navigationOptions:{
          tabBarLabel:"Favorite",
          tabBarIcon:({tintColor,focused})=>(
              <MaterialIcons
                  name={'favorite'}
                  size={26}
                  style={{color:tintColor}}
              />
          )
        }
      },
      MyPage:{
        screen:MyPage,
        navigationOptions:{
          tabBarLabel:"My",
          tabBarIcon:({tintColor,focused})=>(
              <Entypo
                  name={'user'}
                  size={26}
                  style={{color:tintColor}}
              />
          )
        }
      },
    })
  }
  render() {
    navigatorUtil.navigation = this.props.navigation;
    const Tab = createAppContainer(this._createNavBar());
    return <Tab />;
  }
}

const styles = StyleSheet.create({

});
