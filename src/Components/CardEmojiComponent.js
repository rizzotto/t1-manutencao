import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View } from "react-native";

export default class CardEmojiComponent extends Component {
    render(){
        return (
            <TouchableOpacity style={styles.shadow}>
                <Text> Emoji </Text>
                <Text> Raiva </Text>
            </TouchableOpacity>
        )
    }
}


const styles=StyleSheet.create({
    shadow:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 2,
        elevation: 5
    }
})
