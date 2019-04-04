/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import {connect} from "react-redux";
import Actions from "../action";
import navigatorUtil from "../Util/navigatorUtil";

type Props = {};
class FavoritePage extends Component<Props> {
  render() {
    let {navigation} = this.props;
    return (
      <View>
        <Text>FavoritePage</Text>
        <Button title={"更改颜色值"} onPress={()=>{
          this.props.onThemeChange('red');
        }} />
          <View>
              <Text onPress={()=>{
                  navigatorUtil.goPage({navigation:this.props.navigation},'DetailPage');
              }}>详情页</Text>
              <Button title={"搜索页"} onPress={()=>{
                  navigatorUtil.goPage({navigation:this.props.navigation},'UseFetchDemo');
              }} />
              <Button title={"数据储存页"} onPress={()=>{
                  navigatorUtil.goPage({navigation:this.props.navigation},'UseAsyncStorageDemo');
              }} />
              <Button title={"数据缓存"} onPress={()=>{
                  navigatorUtil.goPage({navigation:this.props.navigation},'UseCacheDemo');
              }} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
    return({
        onThemeChange: (theme) => dispatch(Actions.onThemeChange(theme)),
    })
};
export default  connect(mapStateToProps,mapDispatchToProps)(FavoritePage);
