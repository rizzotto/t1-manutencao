import React, {Component} from 'react';
import {Text, StyleSheet, TouchableWithoutFeedback, View, Dimensions } from "react-native";

export default class MyTextComponent extends Component {

    render(){
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <Text style={styles.textStyle}>
                        {this.props.text}
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


const buttonWidth = Math.round(Dimensions.get('window').width);


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        marginLeft: 10
    },
    container: {
        backgroundColor: '#FFF',
        width: buttonWidth,
        padding: 7
    }
})