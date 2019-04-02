/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import navigatorUtile from '../Util/navigatorUtil'

type Props = {};
export default class App extends Component<Props> {
  componentDidMount(){
    const {navigation} = this.props;
    /*this.timer = setTimeout(()=>{
      navigatorUtile.reloadHome(navigation)
    },1000)*/
    navigatorUtile.reloadHome(navigation);
  }
  componentWillMount(): void {
    // this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View><Text>welcome Page</Text></View>
    );
  }
}

const styles = StyleSheet.create({

});
