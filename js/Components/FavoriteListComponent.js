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
type Props = {};
class FavoriteListComponent extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            favorite:true
        };
        this.favorites = this.props.label;
    }
    componentDidMount(): void {


    }
    setFavorite(data){
        const param = this.favorites === TYPESTORE.popular?data.data.id:data.data.url;
        console.log(param,'params');
        const {removeFavoriteData} = this.props;
            removeFavoriteData(param,(status)=>{
                if (status) this.setState({favorite:false});
            },this.favorites);

        // if (this.props)
    }
    getBuildImage(data,index){
        return <Image key={index} style={{width:20,height:20}} source={{uri:data}} />
    }
    render() {
      let {item,label} = this.props;
      let commData;
      let data = item.item.data;
      if (label == TYPESTORE.popular) {
          commData = {
              fullName:data.full_name,
              description:data.description,
              star:data.stargazers_count,
              author:data.owner.avatar_url,
          }
      }else{
          commData = {
              fullName:data.fullName,
              description:data.description,
              star:data.meta,
              author:data.contributors,
          }
      }
      return (
      <View style={styles.bigBox}>
          <TouchableOpacity onPress={()=>{
              console.log(2)
          }} >
              <View>
                  <Text style={styles.title}>{commData.fullName}</Text>
                  <Text style={styles.desc}>{commData.description }</Text>
                  {label === TYPESTORE.trending ?<Text style={styles.star}>{commData.star}</Text>:null}
                  <View style={styles.bottomInfo}>
                      {
                          label === TYPESTORE.popular?<Text style={styles.text1}> Author:  <Image style={{width:20,height:20}} source={{uri:commData.author}} />   </Text>:
                              <Text style={styles.text1}> Build By: { commData.author?commData.author.map((i,index)=>this.getBuildImage(i,index)):null} </Text>
                      }

                      {label === TYPESTORE.popular ? <Text style={styles.text2}>Stars:{commData.star}</Text>:null}
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

});
const mapStateToProps = state=>{
    return {
        theme:state.theme,
        favorite:state.favorite
    }
};
const mapDispatchToProps = dispatch => ({
    removeFavoriteData: (key,callBack,flag) => dispatch(action.removeFavoriteData(key,callBack,flag)),
});
export default connect(mapStateToProps,mapDispatchToProps)(FavoriteListComponent)