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
import {TYPESTORE} from "../cache/dataStore";

const FavoriteKey = TYPESTORE.popular;
type Props = {};
class PopularListComponent extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            favorite:props.item.item.isFavorite
        };

    }
    componentDidMount(): void {


    }
    setFavorite(data,index){
        const {removeFavoriteData,addFavoriteData,updateFavoriteItem} = this.props;
        if (this.props.item.item.isFavorite){
            removeFavoriteData(data.id,(status)=>{
                if (status) {
                    updateFavoriteItem(this.props.popular[this.props.storeName].items,index,false,TYPESTORE.popular);
                    this.setState({favorite:false});
                }
            },FavoriteKey);
        }else{
            addFavoriteData(data.id,data,state=>{
                if (state){
                    updateFavoriteItem(this.props.popular[this.props.storeName].items,index,true,TYPESTORE.popular);
                    this.setState({
                        favorite:true
                    })
                }
            },FavoriteKey);
        }
        // if (this.props)
    }
    render() {
      let {item} = this.props;
      let data = item.item.data;
      let favorite = item.item.isFavorite
        return (
      <View style={styles.bigBox}>
          <TouchableOpacity onPress={()=>{
              console.log(2)
          }} >
              <View>
                  <Text style={styles.title}>{data.full_name}</Text>
                  <Text style={styles.desc}>{data.description}</Text>
                  <View style={styles.bottomInfo}>
                      <Text style={styles.text1}>Author: <Image style={{width:20,height:20}} source={{uri:data.owner.avatar_url}} /> </Text>
                      <Text style={styles.text2}>Stars:{data.stargazers_count}</Text>
                      <Text style={styles.text3} onPress={()=>{
                         this.setFavorite(data,item.index);
                      }}>
                          <Entypo
                            name={favorite?'star':'star-outlined'}
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
        favorite:state.favorite,
        popular:state.popular
    }
};
const mapDispatchToProps = dispatch => ({
    addFavoriteData: (key,data,callBack,flag) => dispatch(action.addFavoriteData(key,data,callBack,flag)),
    removeFavoriteData: (key,callBack,flag) => dispatch(action.removeFavoriteData(key,callBack,flag)),
    getFavoriteData:(key,isState,callBack,flag)=>dispatch(action.getFavoriteData(key,isState,callBack,flag)),
    updateFavoriteItem:(data,index,flag)=>dispatch(action.updateFavoriteItem(data,index,flag))
});
export default connect(mapStateToProps,mapDispatchToProps)(PopularListComponent)