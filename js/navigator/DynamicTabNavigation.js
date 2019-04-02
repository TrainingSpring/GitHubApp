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
import {connect} from "react-redux";


type Props = {};
/**
 * 定义底部导航的路由以及参数
 * @type {{PopularPage: {screen: PopularPage, navigationOptions: {tabBarLabel: string, tabBarIcon: (function({tintColor?: *, focused: *}): *)}}, FavoritePage: {screen: FavoritePage, navigationOptions: {tabBarLabel: string, tabBarIcon: (function({tintColor?: *, focused: *}): *)}}, TrendingPage: {screen: TrendingPage, navigationOptions: {tabBarLabel: string, tabBarIcon: (function({tintColor?: *, focused: *}): *)}}, MyPage: {screen: MyPage, navigationOptions: {tabBarLabel: string, tabBarIcon: (function({tintColor?: *, focused: *}): *)}}}}
 */
const NAVIGATOR = {
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

class DynamicTabNavigation extends Component<Props> {
    /**
     * 通过tabNavigator定制需要显示的组件  从NAVIGATOR中选取
     * @returns {NavigationContainer}
     * @private
     */
    _createNavBar(){
        const {PopularPage,TrendingPage,FavoritePage,MyPage} = NAVIGATOR;
        const tabNavigator = {PopularPage,TrendingPage,FavoritePage};
        /** 返回一个底部导航 */
        return createBottomTabNavigator(tabNavigator,{
            // tabBarComponent: TabBarComponent //对底部导航进行控制   基于react-native-tabs组件  TabBarComponent:用于控制react-navigation-tabs的组件
            tabBarComponent:props=>{
                console.log(props, this.props,"tabbarBottom")
                return <TabBarComponent
                    theme={this.props.theme}
                    {...props}

                />
            }
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
        //定义一个属性,保存BottomTabBar的属性
        this.theme = {
            tintColor:this.props.theme,
            updateTime:new Date().getTime()
        }
    }
    render() {
        console.log(this,'tabBar-this');
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme} //activeTintColor赋值
        />;
    }
}
const mapStateToProps=state=>{
    return({
        theme:state.theme.theme
    })
}
export default connect(mapStateToProps)(DynamicTabNavigation)
