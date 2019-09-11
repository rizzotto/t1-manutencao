import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions } from "react-native";
/**
 * @param styleView estilo da view que comporta o título e a descrição
 * @param styleTitle estilo do texto do título
 * @param styleDescription estilo do texto da descrição
 * @param descriptionText texto do título
 * @param titleText texto da descrição
 * @return componente com titulo e descrição da tela
 *  - Example:
 *    <TitleDescComponent 
 *       styleView={styles.view} 
 *       styleTitle={styles.title} 
 *       styleDescription={styles.description}
 *       TitleText={"Medicamentos"} 
 *       descriptionText={"Informe os medicamentos que que você usa atualmente"}
 *    /> 
 */

export default class TitleDescComponent extends Component {
    
    render(){
        return (
            <View style={[styles.view, this.props.styleView]}>
                {
                    this.props.titleText &&

                    <Text style={[styles.title, this.props.styleTitle]} >
                        {this.props.titleText}
                    </Text>
                }
                {
                    this.props.descriptionText &&  
                    
                    <Text style={[styles.description, this.props.styleDescription]} >
                        {this.props.descriptionText}
                    </Text> 
                }
            </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20, 
        marginBottom: 0,
        marginTop: 50,
        fontWeight: 'bold',
        },
    description: {
        fontSize: 15,
        color: '#BFBFBF',
        marginLeft: 20,
        marginRight: 20, 
    },
    view: {
        width: screenWidth,
    }
}) 

