
import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native'

export default class Toast extends Component<props>{
    constructor(props){
        super(props);
        console.log(this.props,"toast plugin");
    }

    render() {
        return (
            <View styles={styles.bg}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    bg:{
        position:'relative',
        bottom:"50",
        padding:"10",
        left:"50",
        height:10
    },
    text:{
      position: 'absolute',
      top:100

    }
});
