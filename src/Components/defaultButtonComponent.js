import React, {Component} from 'react';
import {
    TouchableOpacity, 
    StyleSheet,
    Text,
    Dimensions,
    View
} from "react-native";
import AppStyle from '../styles';

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
        let opacity = 0.5;
        if (this.props.isDisabled) {
            opacity = 1;
            styleList.push({backgroundColor: AppStyle.colors.mediumGray});
        }

        return (
            <View style={this.props.viewStyle}>
                <TouchableOpacity
                    disabled={this.props.isDisabled} 
                    onPress={action}
                    style={styleList}
                    activeOpacity={opacity} >
                    <Text style={[styles.textStyle, this.props.textStyle]}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        margin: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: "stretch",
        backgroundColor: AppStyle.colors.main,
        borderRadius: 5
    },

    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#FFFFFF'
    }
})