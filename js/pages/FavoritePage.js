/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, FlatList, ToastAndroid, RefreshControl} from 'react-native';
import action from "../action/";
import {connect} from "react-redux";
import FavoriteListComponent from '../Components/FavoriteListComponent'
import NavigationBar from '../Components/navigationBar'
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import {TYPESTORE} from "../cache/dataStore";

type Props = {};
const storeName = ['Popular', 'Trending'];
let PARENT_THEME = "";
class FavoritePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            theme: PARENT_THEME
        };
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
            lazy: true,
            tabBarOptions: {
                style: {
                    backgroundColor: this.state.theme.theme,
                    height: 40,
                }
            }
        });
    }

    componentDidMount(): void {
        this.setState({
            theme: PARENT_THEME
        })
    }

    setTab(data) {
        let tabs = {};
        data.forEach((item, index) => {
            tabs['Favorite__' + index] = {
                screen: props => {
                    return <FavoriteMainTab {...props} tabLabel={item}/>
                },
                navigationOptions: {
                    title: item,
                }
            }
        });
        return tabs;
    }

    render() {
        const Tab = createAppContainer(this._createTopNav());
        const rightBtn =
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <EvilIcons name={'search'} size={24} color={'white'} style={{marginRight: 20}}/>
                <Feather name={'more-vertical'} size={24} color={'white'}/>
            </View>;
        const leftBtn =
            <View style={{flexDirection: 'row', alignItems: 'center', opacity: 0}}>
                <EvilIcons name={'search'} size={24} color={'white'} style={{marginRight: 20}}/>
                <Feather name={'more-vertical'} size={24} color={'white'}/>
            </View>;
        return <View style={{flex: 1}}>
            <NavigationBar statusBar={{backgroundColor: 'pink'}} title={"Favorite"}
                           style={{backgroundColor: this.state.theme.theme}} leftButton={leftBtn}
                           rightButton={rightBtn}/>

            <Tab/>
        </View>
    }
}

class FavoriteMain extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.pageIndex = 1;
        const favoriteKeys = this.storeName === 'Popular' ? TYPESTORE.popular : this.storeName === "Trending" ? TYPESTORE.trending : null;
        this.favoriteKey = favoriteKeys;
    }


    componentDidMount(): void {
        this.loadData();
    }

    loadData() {
        const {getAllFavoriteData} = this.props;
        console.log(this.props);
        getAllFavoriteData(this.favoriteKey, res => {
            if (res == 'success') {
            }
        });
    }


    handleRender(data) {
        return <FavoriteListComponent item={data} label={this.favoriteKey}/>
        // return <View><Text>hello  this is {data.index}</Text></View>
    }

    loadMoreData(finish) {
        let render = <View style={{padding: 20}}>
            <ActivityIndicator color={this.props.theme.theme} size={24}/>
            <Text style={{textAlign: 'center'}}>加载更多</Text>
        </View>
        if (finish) {
            render = <View style={{padding: 20}}>
                <Text style={{textAlign: 'center'}}>-----我是有底线的-----</Text>
            </View>
        }
        return render
    }

    render() {
        const {favorite} = this.props;
        let store = favorite;
        let content;
        if (!store) {
            store = {
                popularData: [],
                trendingData: [],
            }
        }
        let items = this.favoriteKey === TYPESTORE.popular?store.popularData:this.favoriteKey === TYPESTORE.trending?store.trendingData:null;
        if (this.favoriteKey === TYPESTORE.popular && (items && items.length <= 0)) {
            content = <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                <Text style={ {color: 'blue'} } onPress={()=>this.loadData()}>点击刷新</Text>
            </View>
        }else if (this.favoriteKey === TYPESTORE.trending && (items && items.length <= 0)){
            content = <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                <Text style={ {color: 'blue'} } onPress={()=>this.loadData()}>点击刷新</Text>
            </View>
        }else{
            content = <FlatList
                data={items}
                keyExtractor={item => "favorite_" + (item.data.id ? item.data.id : item.data.url)}
                renderItem={(data) => {
                    return this.handleRender(data,store);
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={store.isLoading}
                        colors={[this.props.theme.theme]}
                        tintColor={this.props.theme.theme}
                        titleColor={this.props.theme.theme}
                        title={'Loading...'}
                        onRefresh={()=>this.loadData()}
                    />
                }
            />
        }
        return <View>
            {content}
        </View>
    }
}

const mapStateToProps = state => {
    PARENT_THEME = state.theme;
    return ({
        favorite: state.favorite,
        theme: state.theme
    });
}
const mapDispatchToProps = dispatch => ({
    removeFavoriteData: (key, callBack, flag) => dispatch(action.removeFavoriteData(key, callBack, flag)),
    getAllFavoriteData: (flag, callBack) => dispatch(action.getAllFavoriteData(flag, callBack)),
});
const FavoriteMainTab = connect(mapStateToProps, mapDispatchToProps)(FavoriteMain);
export default FavoritePage;