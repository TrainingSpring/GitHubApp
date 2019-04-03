/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,AsyncStorage } from 'react-native';
import Cache from '../cache/cache'

type Props = {};
export default class UseCacheDemo extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            setVal:''
        }
    }
    searchData(){
        let cache = new Cache;
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        let result = cache._initData(url);
        result.then(response=>{
            /**
            * @Author:Training
            * @Desc:暂时写到这  等待调试
            * @Params:
            */
            let result = JSON.parse(response);
            let time = new Date(result.timestamp);
            console.log (time);
            this.setState({
                setVal:result.data,
                timestamp:time
            })
            console.log(JSON.parse(response));
        }).catch(error=>{
            console.log(error,"error")
        })
    }
  render() {
    return (
      <View>
          <Text>AsyncStorage 数据存储 示例</Text>
          <View style={styles.content}>
              <TextInput placeholder={'搜索值'} style={styles.input} onChangeText={(data)=>{
                  this.searchKey = data;
              }} />
          </View>
          <View style={styles.content}>
              <Text style={styles.text} onPress={()=>{this.searchData()}}>查询</Text>
          </View>
          <Text>数据储存的时间是:{this.state.timestamp}=================数据内容{this.state.setVal}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
    content:{
        flexDirection:'row',
    },
    input:{
        height:100,
        borderWidth:1,
        flex:1,
        borderColor:'#ccc',
    },
    text:{
        margin:30,
    }
});
