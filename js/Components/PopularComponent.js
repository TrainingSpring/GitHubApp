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
import action from "../action";
import {addFavoriteData} from "../action/popular";


type Props = {};
class PopularComponent extends Component<Props> {
    constructor(props){
        super(props);
        const {getFavoriteData} = this.props;
        getFavoriteData();
        this.state={
            favorite:false
        };
        console.log(this.props,'construct')

    }
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
                          let { addFavoriteData }=this.props;
                          addFavoriteData(item);
                      }}>
                          <Entypo
                            name={item.favorite?'star':'star-outlined'}
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
        theme:state.theme,
        favorite:state.favorite
    }
};
const mapDispatchToProps = dispatch => ({
    addFavoriteData: (data) => dispatch(action.addFavoriteData(data)),
    getFavoriteData:()=>dispatch(action.getFavoriteData())
});
export default connect(mapStateToProps,mapDispatchToProps)(PopularComponent)