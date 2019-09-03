import React, {Component} from 'react';
import {Text, StyleSheet } from "react-native";

export default class MyTextComponent extends Component {

    render(){
        return (
            <Text style={styles.textStyle}>
                {this.props.text}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20
    }
})