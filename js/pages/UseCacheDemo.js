/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,AsyncStorage } from 'react-native';
import CachePopular from '../cache/cachePopular'

type Props = {};
export default class UseCacheDemo extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            setVal:''
        }
    }
    /**
    * @Author: Training
    * @Desc: 搜索功能
    * @Params:
    */
    searchData(){
        let cache = new CachePopular;
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        let result = cache._initData(url);
        result.then(response=>{

            // let result = JSON.parse(response);
            let time = new Date(response.timeStamp);
            let ymd = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}  ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
            console.log (time,response,ymd,'useCache');
            this.setState({
                setVal:response.data,
                timeStamp:ymd
            })
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
          <Text>数据储存的时间是:{this.state.timeStamp}=================数据内容{this.state.setVal}</Text>
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
