import React, {Component} from 'react';
import {
    TouchableOpacity, 
    StyleSheet,
    Text,
    Dimensions,
    View
} from "react-native";

export default class DefaultButtonComponent extends Component {
    
    /*
    Props:
    action
    style
    textStyle
    isDisabled

        Example:
        <DefaultButtonComponent 
            text={"Botão"} 
            action={this.action}
            disabled={true}
            style={styles.buttonStyle} 
            textStyle={styles.textStyle} 
        /> 
*/

    defaultAction = () => {
        console.warn("Funcionalidade não implementada");
    }

    render() {
        
        let action = this.props.action || this.defaultAction;
        let styleList = [styles.buttonStyle, this.props.style];
        if (this.props.isDisabled) {
            styleList.push({backgroundColor: "#C0C0C0"});
        }

        return (
            <View style={this.props.viewStyle}>
                <TouchableOpacity 
                    onPress={action}
                    style={[styles.buttonStyle, this.props.style]} >
                    <Text style={[styles.textStyle, this.props.textStyle]}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#FFC170',
        borderRadius: 5,
        width: buttonWidth
    },

    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#FFFFFF'
    }
})