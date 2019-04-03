/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View, Button} from 'react-native';

type Props = {};
export default class UseFetchDemo extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            searchVal: ''
        }
    }
    /**
    * @Author:Training
    * @Desc: https://api.github.com/search/repositories?q=java 此请求地址是GitHub的搜索地址,
     *          此函数功能是搜索编辑框中的数据!
    * @Params:none
    */
    searchBtn() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }else{
                    throw new Error("the network request throw is error , check it please");
                }
            })
            .then((responseJson) => {
                this.setState({
                    searchVal:responseJson
                })
            }).catch((err) => {
                // console.error(err);
                this.setState({
                    searchVal:err.toString()
                })
            })
    }

    render() {
        return (
            <View>
                <Text>搜索获取信息</Text>
                <View style={styles.searchBox}>
                    <TextInput style={styles.input} placeholder={"搜索值"} onChangeText={(data) => {
                        this.searchKey = data;
                    }}/>
                    <Button style={styles.searchBtn} title={'搜索'} onPress={() => {
                        this.searchBtn();
                    }}/>
                </View>

                <Text>
                    {this.state.searchVal}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1
    },
    searchBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
