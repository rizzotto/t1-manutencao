import React, { Component } from 'react';

import { StyleSheet, View, Dimensions} from 'react-native';

 /**
 * props for ProgressBar Component
 * - width={porcentagem} (tanto no formato real quanto fracionario)
 * example: <ProgressBarComponent width={5/10}/> (estou na tela 5 de um fluxo com 10 telas)
 * example2: <ProgressBarComponent width={0.5}/> (estou na tela 5 de um fluxo com 10 telas)
 */
const screenSize = Math.round(Dimensions.get('window').width);

 export default class TextInputComponent extends Component {
    render() {
        console.warn(screenSize)
        return (
            <View>
                <View style={styles.RectangleShapeView} />
                <View style={styles.RectangleShapeViewProgress} width={screenSize*this.props.width}/> 
            </View>
        );
    }
}


const styles = StyleSheet.create({

    RectangleShapeView: {
        width: '100%',
        height: 5,
        backgroundColor: '#E5E5E5',
        position: 'absolute',
    },

    RectangleShapeViewProgress: {
        height: 5,
        backgroundColor: '#FDBB61',
         position: 'absolute',
    }
});