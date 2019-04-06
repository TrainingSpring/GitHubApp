/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo"
import {connect} from "react-redux";


type Props = {};
class PopularComponent extends Component<Props> {
  render() {
      let {item} = this.props;
      return (
      <View style={styles.bigBox}>
          <TouchableOpacity onPress={()=>{
              console.log(2)
          }} >
              <View>
                  <Text style={styles.title}>{item.item.full_name}</Text>
                  <Text style={styles.desc}>{item.item.description}</Text>
                  <View style={styles.bottomInfo}>
                      <Text style={styles.text1}>Author: <Image style={{width:20,height:20}} source={{uri:item.item.owner.avatar_url}} /> </Text>
                      <Text style={styles.text2}>Stars:{item.item.stargazers_count}</Text>
                      <Text style={styles.text3} onPress={()=>{
                          console.log(1);
                      }}>
                          <Entypo
                            name={'star-outlined'}
                            size={20}
                            color={this.props.theme.theme}
                          />
                      </Text>
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
    title:{
        color:'black'
    },
    desc:{
        paddingTop:10,
        paddingBottom:10
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
const mapStateToProps = state=>{
    return {
        theme:state.theme
    }
}
export default connect(mapStateToProps)(PopularComponent)