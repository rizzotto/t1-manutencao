import React, {Component} from 'react';
import {
    TouchableOpacity, 
    StyleSheet,
    Text,
    Dimensions
} from "react-native";

export default class DefaultButtonComponent extends Component {
    
    render() {
        defaultAction = () => {
            console.alert("Funcionalidade não implementada");
        }
        
        let action = this.props.action || defaultAction;

        return (
            <TouchableOpacity 
                onPress={action}
                style={[
                    styles.buttonStyle, 
                    this.props.style, 
                    styles.buttonColor, 
                    this.props.color]} >
                <Text style={styles.textStyle}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const buttonWidth = Math.round(Dimensions.get('window').width) - 15;

const styles = StyleSheet.create({
    buttonStyle: {
        margin: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        width: buttonWidth
    },

    buttonColor: {
        backgroundColor: '#FFC170'
    },

    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#FFFFFF'
    }
})