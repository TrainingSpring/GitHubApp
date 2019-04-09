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

const FavoriteKey = TYPESTORE.trending;
type Props = {};
class PopularListComponent extends Component<Props> {
    constructor(props){
        super(props);
        const {item,getFavoriteData} = this.props;
        this.state = {
            favorite:false
        };
        getFavoriteData(item.item.url,status=>{
            if (status) {
                this.state.favorite = true;
            }else{
                this.state.favorite=false
            }
        },true,FavoriteKey);

    }
    componentDidMount(): void {


    }
    setFavorite(data){
        const {removeFavoriteData,addFavoriteData} = this.props;
        if (this.state.favorite){
            removeFavoriteData(data.url,(status)=>{
                if (status) this.setState({favorite:false});
            },FavoriteKey);
        }else{
            addFavoriteData(data.url,data,state=>{
                if (state){
                    this.setState({
                        favorite:true
                    })
                }
            },FavoriteKey);
        }
        // if (this.props)
    }
    getBuildImage(data,index){
        return <Image key={index} style={{width:20,height:20}} source={{uri:data}} />

    }
    render() {
      let {item} = this.props;
        return (
      <View style={styles.bigBox}>
          <TouchableOpacity onPress={()=>{
              console.log(2)
          }} >
              <View>
                  <Text style={styles.title}>{item.item.fullName}</Text>
                  <Text style={styles.desc}>{item.item.description}</Text>
                  <Text style={styles.star}>{item.item.meta}</Text>
                  <View style={styles.bottomInfo}>
                      <Text style={styles.text1}>Build By: {item.item.contributors?item.item.contributors.map((i,index)=>this.getBuildImage(i,index)):null }</Text>
                      <Text style={styles.text3} onPress={()=>{
                         this.setFavorite(item.item);
                      }}>
                          <Entypo
                            name={this.state.favorite?'star':'star-outlined'}
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
        justifyContent:'space-between'
    },
    title:{
        color:'black'
    },
    desc:{
        paddingTop:10,
        paddingBottom:10
    },
    star:{}
});
const mapStateToProps = state=>{
    return {
        theme:state.theme,
        favorite:state.favorite
    }
};
const mapDispatchToProps = dispatch => ({
    addFavoriteData: (key,data,callBack,flag) => dispatch(action.addFavoriteData(key,data,callBack,flag)),
    removeFavoriteData: (key,callBack,flag) => dispatch(action.removeFavoriteData(key,callBack,flag)),
    getFavoriteData:(key,isState,callBack,flag)=>dispatch(action.getFavoriteData(key,isState,callBack,flag))
});
export default connect(mapStateToProps,mapDispatchToProps)(PopularListComponent)