/**
 * @Author:Training
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, ViewPropTypes} from 'react-native';
import {PropTypes} from "prop-types";

const statusBarShape = {
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']), //'default', 'light-content', 'dark-content'
    hidden: PropTypes.bool,             // 是否隐藏
    backgroundColor: PropTypes.string,  //状态栏背景颜色: Android
}

type Props = {};
export default class NavigationBar extends Component<Props> {
    static propTypes = {
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        contentTitle: PropTypes.element,
        title: PropTypes.string,
        style: ViewPropTypes.style,
        statusBar: PropTypes.shape(statusBarShape)
    };
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content', //'default', 'light-content', 'dark-content'
            hidden: false,             // 是否隐藏
            backgroundColor: '#ccc',  //状态栏背景颜色: Android
        }

    }

    setElement(data) {
        return <View style={styles.navBarButton}>
            {data ? data : null}
        </View>
    }

    render() {
        let tabStatusBar =
            <View style={styles.headBar}>
                <StatusBar {...this.props.statusBar} />
            </View>;
        let titleView = this.props.contentTitle ? this.props.contentTitle :
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}> {this.props.title} </Text>;
        let content =
            <View style={styles.container}>
                {this.setElement(this.props.leftButton)}
                <View style={styles.titleStyle}>
                    {titleView}
                </View>
                {this.setElement(this.props.rightButton)}
            </View>
        return (
            <View style={[styles.control, this.props.style]}>
                {tabStatusBar}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headBar: {
        height: Platform.OS === 'ios' ? 20 : 0
    },
    control: {},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 40 : 50,
        justifyContent: 'space-between'
    },
    title: {
        color: "white",
        fontSize: 24,
    },
    navBarButton: {
        padding: 10
    }
});