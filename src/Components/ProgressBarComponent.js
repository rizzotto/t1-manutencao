//ffcc00
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

 /**
 * props for ProgressBar Component
 * - width={porcentagem} (tanto no formato real quanto fracionario)
 * example: <ProgressBarComponent width={5/10}/> (estou na tela 5 de um fluxo com 10 telas)
 * example2: <ProgressBarComponent width={0.5}/> (estou na tela 5 de um fluxo com 10 telas)
 */
export default class TextInputComponent extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.RectangleShapeViewProgress} width={360*this.props.width}/> 
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
        width: 360,
        height: 5,
        backgroundColor: '#E5E5E5',
        position: 'absolute',
        left:-180,
        top:0,
        zIndex: -1,
    },

    RectangleShapeViewProgress: {
        flex:0,
        height: 5,
        backgroundColor: '#FDBB61',
        position: 'absolute',
        left:-180,
        top:0,
    }
});