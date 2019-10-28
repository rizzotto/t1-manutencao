import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import AppStyle from '../styles';

/**
 * @author Pâmela Mendonça, Felipe Boff, Gabriel Sutério, Ardel Junior 
 * @param emoji String do emoji
 * @param text Descrição do emoji
 * @param onPress Função que deve ser executada ao clicar no Card
 *  
 * 
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <CardEmojiComponent text="Raiva" emoji=":)"/>
 */

export default class CardEmojiComponent extends Component {
    render() {
        const selected = this.props.selected;
        const styles = createStyles(selected);

        return (
            <TouchableOpacity style={[styles.shadow, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.centerEmoji}> {this.props.emoji} </Text>
                    </View>
                    <View>
                        <Text style={styles.centerText}> {this.props.text} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const createStyles = (selected) => {
    return StyleSheet.create({
        shadow: {
            paddingHorizontal: 10,
            paddingVertical: 15,
            elevation: 5,
            shadowColor: AppStyle.colors.lightGray,
            shadowOpacity: 2,
            shadowOffset: {
                width: 0,
                height: 4
            },
            borderColor: selected ? AppStyle.colors.main : AppStyle.colors.background,
            borderRadius: 10,
            borderWidth: 2,
            backgroundColor: AppStyle.colors.background
        },
        container: {
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center"
        },
        centerText: {
            textAlign: "center",
            fontSize: 16,
            marginLeft: Platform.OS === "ios" ? -5 : 0 // por algum motivo, no iOS fica com espaço no início do texto
        },
        centerEmoji: {
            textAlign: "center",
            fontSize: Platform.OS === "android" ? 50 : 40,
            marginLeft: Platform.OS === "ios" ? -5 : 0 // por algum motivo, no iOS fica com espaço no início do texto
        },
    })
}
