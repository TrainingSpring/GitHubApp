/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';

type Props = {};
export default class PopularComponent extends Component<Props> {
  render() {
      let {item} = this.props;
      console.log(item.item);
      return (
      <View style={styles.bigBox}>
          <TouchableOpacity >
              <View>
                  <Text>{item.item.full_name}</Text>
                  <Text>{item.item.description}</Text>
                  <View style={styles.bottomInfo}>
                      <Text style={styles.text1}>Author: {item.item.owner.login} </Text>
                      <Text style={styles.text2}>Stars:{item.item.stargazers_count}</Text>
                      <Text style={styles.text3}>收藏</Text>
                  </View>
              </View>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    bigBox:{
        padding:10,
        borderWidth:1,
        borderColor:'#ccc',
        marginTop:10
    },
    bottomInfo:{
        flexDirection:'row',
    },
    text1:{
        flex:3
    },
    text2:{
        flex:3
    },
    text3:{
        flex:1
    }
});
