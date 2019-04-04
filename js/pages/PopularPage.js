/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View , FlatList} from 'react-native';
import {onLoadPopularData} from "../action/popular";
import {connect} from "react-redux";
import PopularComponent from '../Components/PopularComponent'
import navigatorUtil from '../Util/navigatorUtil'
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";


type Props = {};
const storeName=['Java','Ios','Android','Php','JavaScript','Python'];
const url = 'https://api.github.com/search/repositories?q=';
var num = 0;
class PopularPage extends Component<Props> {
    /**
     * @desc 创建按头部导航，配置并将createMaterialTopTabNavigator返回
     *       以供createAppContainer使用
     * @returns {NavigationContainer}
     * @private
     */
    _createTopNav(){
        console.log(this,'_createTopNav');
        let tab = this.setTab(storeName)
        return createMaterialTopTabNavigator(tab,{
            tabBarOptions:{
                scrollEnabled:true
            }
        });
    }
    setTab(data) {
        let tabs = {};
        data.forEach((item,index)=>{
            tabs['tab'+index] = {
                screen:props => <PopularMainTab {...props} tabLabel={item} />,
                navigationOptions: {
                    title: item
                }
            }
        });
        return tabs;
    }
    render() {
        const Tab = createAppContainer(this._createTopNav());
        return (
            <Tab></Tab>
        );
    }
}
class PopularMain extends Component{
    constructor(props){
        super(props)
        const {tabLabel} = this.props;
        this.storeName=tabLabel;
    }
    componentDidMount(): void {
        this.loadData();
    }

    loadData(){
        const {onLoadPopularData} = this.props;
        const url = this.setUrl(this.storeName);
        onLoadPopularData(this.storeName,url);
    }
    setUrl(key){
        return url + key
    }
    handleRender(data){
        return (
            <PopularComponent item={data} />
        )
    }
    render(){
        const {popular} = this.props;
        let store = popular[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading:false
            }
        }
        return <View>
            <FlatList data={store.items} refreshing={store.isLoading} renderItem={(data)=>this.handleRender(data)} />
        </View>
    }
}
const mapStateToProps = state=>({
    popular:state.popular
});
const mapDispatchToProps = dispatch=>({
    onLoadPopularData:(storeName,url)=>dispatch(onLoadPopularData(storeName,url))
});
const PopularMainTab = connect(mapStateToProps,mapDispatchToProps)(PopularMain);
export default PopularPage;