/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import navigatorUtil from '../Util/navigatorUtil'
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";


type Props = {};
class PopularPage extends Component<Props> {
    /**
     * @desc 创建按头部导航，配置并将createMaterialTopTabNavigator返回
     *       以供createAppContainer使用
     * @returns {NavigationContainer}
     * @private
     */
    _createTopNav(){
        return createMaterialTopTabNavigator({
            Tab1:{
                screen:PopularMain,
                navigationOptions:{
                    title:'tab1'
                }
            },
            Tab2:{
                screen:PopularMain,
                navigationOptions:{
                    title:'tab2'
                }
            }
        })
    }
    render() {
        const Tab = createAppContainer(this._createTopNav());

        return (
            <Tab></Tab>
        );
    }
}
class PopularMain extends Component{
    render(){
        return <View><Text onPress={()=>{
            navigatorUtil.goPage({navigation:this.props.navigation},'DetailPage');
        }}>详情页</Text></View>
    }
}
const styles = StyleSheet.create({

});
export default PopularPage;