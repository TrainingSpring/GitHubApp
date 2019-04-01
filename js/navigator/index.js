/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'

const InitNavigator=createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null
        }
    }
});
const MainNavigator=createStackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            header:null
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
            headerTitle:'back',
            headerBackground:"green"
        }
    }
});
export default createAppContainer(createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
},{
    navigationOptions:{
        header:null
    }
}))
