/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text,RefreshControl, View, FlatList,ToastAndroid} from 'react-native';
import action from "../action/";
import {connect} from "react-redux";
import PopularComponent from '../Components/PopularListComponent'
import NavigationBar from '../Components/navigationBar'
import navigatorUtil from '../Util/navigatorUtil'
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"

type Props = {};
const storeName = ['Java', 'Ios', 'Android', 'Php', 'JavaScript', 'Python'];
const url = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
var num = 0;
let PARENT_THEME = "";
class PopularPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            theme:PARENT_THEME
        }
    }
    /**
     * @desc 创建按头部导航，配置并将createMaterialTopTabNavigator返回
     *       以供createAppContainer使用
     * @returns {NavigationContainer}
     * @private
     */
    _createTopNav() {
        let tab = this.setTab(storeName);
        return createMaterialTopTabNavigator(tab, {
            lazy:true,
            tabBarOptions: {
                scrollEnabled: true,
                style:{
                    backgroundColor:this.state.theme.theme,
                    height:40,
                }
            }
        });
    }
    componentDidMount(): void {
        this.setState({
            theme:PARENT_THEME
        })
    }

    setTab(data) {
        let tabs = {};
        data.forEach((item, index) => {
            tabs['tab' + index] = {
                screen: props =>{
                    return  <PopularMainTab {...props} tabLabel={item}/>
                },
                navigationOptions: {
                    title: item,
                }
            }
        });
        return tabs;
    }

    render() {
        const Tab =  createAppContainer(this._createTopNav());
        const rightBtn=
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <EvilIcons name={'search'} size={24} color={'white'} style={ {marginRight:20} }/>
                <Feather  name={'more-vertical'} size={24} color={'white'}/>
            </View>;
        const leftBtn=
            <View style={{flexDirection:'row',alignItems:'center',opacity:0}}>
                <EvilIcons name={'search'} size={24} color={'white'} style={ {marginRight:20} }/>
                <Feather  name={'more-vertical'} size={24} color={'white'}/>
            </View>;

        return <View style={{flex:1}}>
                <NavigationBar statusBar={{backgroundColor:'pink'}} title={"Popular"} style={ {backgroundColor: this.state.theme.theme} } leftButton={leftBtn} rightButton={rightBtn}/>
                <Tab />
            </View>
    }
}

class PopularMain extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.pageIndex = 1;
    }

    componentDidMount(): void {
        this.loadData();
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.setUrl(this.storeName);
        onLoadPopularData(this.storeName, url,false);
    }

    setUrl(key) {
        return url + key + QUERY_STR
    }

    handleRender(data) {
        return (
            <PopularComponent item={data}/>
        )
    }
    loadMoreData(finish){
        let render = <View style={{padding:20}}>
            <ActivityIndicator color={this.props.theme.theme} size={24}/>
            <Text style={{textAlign: 'center'}}>加载更多</Text>
        </View>
         if (finish) {
             render = <View style={{padding:20}}>
                 <Text style={{textAlign: 'center'}}>-----我是有底线的-----</Text>
             </View>
         }
        return render
    }
    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        return <View>
            <FlatList
                data={store.items}
                keyExtractor={item => "" + item.id}
                renderItem={(data) => this.handleRender(data)}
                ListFooterComponent={()=>this.loadMoreData(store.finish)}
                onEndReachedThreshold={0.5}
                onEndReached={()=>{
                        if(this.isLoadMore){
                            this.pageIndex++;
                            const {onLoadMorePopularData} = this.props;
                            onLoadMorePopularData(this.storeName,store.data,store.items,10,this.pageIndex);
                            this.isLoadMore = false;
                        }
                    }
                }
                onMomentumScrollBegin={()=>{
                    this.isLoadMore = true
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={store.isLoading}
                        colors={[this.props.theme.theme]}
                        tintColor={this.props.theme.theme}
                        titleColor={this.props.theme.theme}
                        title={'Loading...'}
                        onRefresh={()=>{
                            this.pageIndex = 1;
                            const url = this.setUrl(this.storeName);
                            const {onLoadPopularData} = this.props;
                            onLoadPopularData(this.storeName, url,true);
                        }}
                    />
                }
            />
        </View>
    }
}

const mapStateToProps = state => {
    PARENT_THEME = state.theme;
    return ({
        popular: state.popular,
        theme: state.theme
    });
}
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url,refresh,pageSize=10) => dispatch(action.onLoadPopularData(storeName, url,refresh,pageSize)),
    onLoadMorePopularData:(storeName,allData,items,pageSize,pageIndex)=>dispatch(action.onLoadMorePopularData(storeName,allData,items,pageSize,pageIndex))
});
const PopularMainTab = connect(mapStateToProps, mapDispatchToProps)(PopularMain,PopularPage);
export default PopularPage;