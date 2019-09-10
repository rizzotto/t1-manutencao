import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput } from "react-native";
import DefaultButton from './defaultButtonComponent';

    /*
    Props:
    placeholder
    buttonText
    buttonAction
    listItemStyle
    placehoderStyle
    buttonStyle
    buttonTextStyle

        Example:
        <ItenInputList
            listItemStyle={styles.listInputStyle}
            placeholder={"Outro..."}
            placehoderStyle={styles.placeholderStyle}
            buttonText={"Adicionar"} 
            buttonAction={this.action}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
        />
*/

export default class ItenInputList extends Component {
    render(){
        return (
        <View style={[styles.listItem, this.props.listItemStyle]}>
            <TextInput
            style={[styles.placeholder, this.props.placeholderStyle]}
            editable
            maxLength={50}
            placeholder={this.props.placeholder}
            />
            <DefaultButton 
            text={this.props.buttonText} 
            action={this.props.buttonAction} 
            style={[styles.button, this.props.buttonStyle]}
            textStyle={[styles.text, this.props.buttonTextStyle]}
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