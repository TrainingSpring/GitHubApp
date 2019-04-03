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
