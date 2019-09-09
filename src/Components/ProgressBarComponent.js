//ffcc00
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

export default class TextInputComponent extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.RectangleShapeViewProgress} />
                <View style={styles.RectangleShapeView} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    RectangleShapeView: {
        flex:0,
        //marginTop: 20,
        width: 360,
        height: 5,
        backgroundColor: '#E5E5E5',
        position: 'absolute',
        left:-180,
        top:0,
        zIndex: -1,
    },

    RectangleShapeViewProgress: {
        //marginTop: 20,
        flex:0,
        width: 0.3 * 360,
        height: 5,
        backgroundColor: '#FDBB61',
        position: 'absolute',
        left:-180,
        top:0,
    }
});