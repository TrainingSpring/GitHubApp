/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

type Props = {};
export default class FavoritePage extends Component<Props> {
  render() {
    let {navigation} = this.props;
    return (
      <View>
        <Text>FavoritePage</Text>
        <Button title={"更改颜色值"} onPress={()=>{
          navigation.setParams({
            them:{
              tintColor: 'red',
              updateTime: new Date().getTime()
            }
          })
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
