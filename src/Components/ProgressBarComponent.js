import React, { Component } from 'react';

import { StyleSheet, View, Dimensions} from 'react-native';
import AppStyle from '../styles';

 /**
 * props for ProgressBarComponent
 * - width={porcentagem} (tanto no formato real quanto fracionario)
 * - style={ViewStyleProps} estilo aplicado na view da barra de progresso
 * example: <ProgressBarComponent width={5/10}/> (estou na tela 5 de um fluxo com 10 telas)
 * example2: <ProgressBarComponent width={0.5}/> (estou na tela 5 de um fluxo com 10 telas)
 */
const screenSize = Math.round(Dimensions.get('window').width);

 export default class ProgressBarComponent extends Component {
    render() {
        return (
            <View style={this.props.style}>
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
        backgroundColor: AppStyle.colors.lightGray,
        position: 'absolute',
    },

    RectangleShapeViewProgress: {
        height: 5,
        backgroundColor: AppStyle.colors.main,
         position: 'absolute',
    }
});