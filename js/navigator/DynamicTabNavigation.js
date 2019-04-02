/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialTopTabNavigator,createBottomTabNavigator,createAppContainer} from "react-navigation";
import {BottomTabBar} from 'react-navigation-tabs'
import {Platform, StyleSheet, Text, View} from 'react-native';
import navigatorUtil from "../Util/navigatorUtil"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import PopularPage from '../pages/PopularPage'
import FavoritePage from '../pages/FavoritePage'
import TrendingPage from '../pages/TrendingPage'
import MyPage from '../pages/MyPage'


type Props = {};
const NAVGATOR = {
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
};

export default class DynamicTabNavigation extends Component<Props> {
    /**
     * @desc  使用navigation中的createBottomTabNavigator
     *        创建一个底部导航navBar,并将其返回出来
     *        以便于createAppContainer的使用
     * @returns {NavigationContainer}
     * @private
     */
    _createNavBar(){
        const {PopularPage,TrendingPage,FavoritePage,MyPage} = NAVGATOR;
        const tabNavigator = {PopularPage,TrendingPage,FavoritePage};
        return createBottomTabNavigator(tabNavigator,{
            tabBarComponent: TabBarComponent
        });
    }
    render() {
        const Tab = createAppContainer(this._createNavBar());
        return <Tab />;
    }
}
class TabBarComponent extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.them = {
            tintColor:props.activeTintColor,
            updateTime:new Date().getTime()
        }
    }

    render() {
        let {routes,index} = this.props.navigation.state;
        if (routes[index].params){
            let {them} = routes[index].params;
            if (them && them.updateTime > this.them.updateTime) {
                this.them = them;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.them.tintColor || this.props.activeTintColor}
        />;
    }
}
const styles = StyleSheet.create({

});
