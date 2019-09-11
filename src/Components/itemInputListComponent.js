import React, {Component} from 'react';
import {StyleSheet, View, TextInput } from "react-native";
import DefaultButton from './defaultButtonComponent';
    /**
     * @param styleListItem estilo do item inteiro
     * @param stylePlacehoder estilo do placeholder do input
     * @param placeholder texto do placeholder do input
     * @param buttonText texto do botao
     * @param buttonAction acao do botao 
     * @param styleButton estilo do botao
     * @param styleButtonText estilo do texto do botao
     * @return componente de item de lista (com input e botao)
     * - Example
     *   <ItemInputList
     *       styleListItem={styles.listInputStyle}
     *       placeholder={"Outro..."}
     *       stylePlacehoder={styles.placeholderStyle}
     *       buttonText={"Adicionar"} 
     *       buttonAction={this.action}
     *       styleButton={styles.buttonStyle}
     *       styleButtonText={styles.buttonTextStyle}
     *   />
     */

export default class ItemInputList extends Component {
    render(){
        return (
        <View style={[styles.listItem, this.props.styleListItem]}>
            <TextInput
            style={[styles.placeholder, this.props.stylePlaceholder]}
            editable
            maxLength={50}
            placeholder={this.props.placeholder}
            />
            <DefaultButton 
            text={this.props.buttonText} 
            action={this.props.buttonAction} 
            style={[styles.button, this.props.styleButton]}
            textStyle={[styles.text, this.props.styleButtonText]}
            />
        </View>
        );
    }
}
const styles = StyleSheet.create({
    placeholder: {
        fontSize: 20,
        color: '#333333',
        width: '70%',
        borderColor: '#999999',
        borderBottomWidth: 1,
        padding: 0,
        
    },
    listItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

   },
    button: {
        width: '20%',
        height: '70%',
        padding: 0,
    },
    text: {
        fontSize: 10,
        textAlignVertical: "center"
    }
}) 