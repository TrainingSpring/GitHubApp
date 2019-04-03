/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,AsyncStorage } from 'react-native';

type Props = {};
export default class UseAsyncStorageDemo extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            setVal:''
        }
    }
    /**
    * @Author:Training
    * @Desc:数据存储
    * @Params:none
    */
    async saveData(){
        console.log(this.setDat);
        AsyncStorage.setItem("key",this.setDat,(res)=>{
            // console.log(res);
        }).then((resp)=>{
            console.log(resp,"保存成功");
        });
    }
    /**
     * @Author:Training
     * @Desc:数据删除
     * @Params:none
     */
    async delData(){
        AsyncStorage.removeItem('key').then(()=>{
            this.setState({
                setVal:null
            });
            console.log("删除成功");
        }).catch((err)=>{
            console.error(err);
        });
    }
    /**
     * @Author:Training
     * @Desc:数据查找
     * @Params:none
     */
    async searchData(){
        AsyncStorage.getItem('key',(err,res)=>{
            this.setState({
                setVal:res
            });
            console.log('调用查找函数');
        })
    }
    
  render() {
    return (
      <View>
          <Text>AsyncStorage 数据存储 示例</Text>
          <View style={styles.content}>
              <TextInput placeholder={'输入需要存储的数据'} style={styles.input} onChangeText={(data)=>{
                  this.setDat = data;
              }} />
          </View>
          <View style={styles.content}>

              <Text style={styles.text} onPress={()=>{this.saveData()}}>保存</Text>
              <Text style={styles.text} onPress={()=>{this.delData()}}>删除</Text>
              <Text style={styles.text} onPress={()=>{this.searchData()}}>查询</Text>
          </View>
          <Text>{this.state.setVal}</Text>
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
