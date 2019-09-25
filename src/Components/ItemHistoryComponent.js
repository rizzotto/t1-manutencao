import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Dimensions } from "react-native";
import Arrow from './Arrow';
import AppStyle from '../styles';
/**
     * @param hasEmoji Indica se o item possui emoji de representacao de sentimento
     * @param list Lista de dados que estarao representados no item
     * @param emoji Codigo do emoji a ser inserido na lista
     * @param day Dia do Item que fora adicionado 
     * @return Component do item de historico
     * EXAMPLE:
     * <ItemHistoryComponent
            list={DATA}
            hasEmoji={true}
            emoji={"😄"}
            day={"15"}
        />

        EMOJIS:
        Raiva: 😡
        Cansado: 😞
        Chateado: 😕
        Tanto Faz: 😐
        Contente: 🙂
        Feliz: 😁
     */

export default class ItemHistoryComponent extends Component {
        render(){
            return (

                <View style={styles.button}>
                        <View style={styles.circle}/>
                    <TouchableOpacity style={styles.button} onPress={this.props.action}>
                        <View style={styles.date}>
                            <Text style={styles.number}>
                                {this.props.day}
                            </Text>
                            <Text style={styles.month}>
                                {this.props.mes}
                            </Text>
                        </View>
                        <View style={this.props.hasEmoji ? styles.textsWithEmoji : styles.textsWithoutEmoji}>
                            
                            <FlatList
                                data={this.props.list}
                                renderItem={({ item }) => (
                                    <Text style={styles.item} numberOfLines={1}>
                                        <Text style={styles.title}>
                                            {item.id}
                                        </Text>
                                        <Text style={styles.text}>
                                            {item.title}
                                        </Text>
                                    </Text>
                                    )}
                                keyExtractor={item => item.id}
                            />
         
                        </View>
                        
                        {this.props.hasEmoji && 
                        <View style={styles.emojiView}>
                            <Text style={styles.emoji} >
                                {this.props.emoji}
                            </Text>
                        </View>}
                        
                        <View style={styles.enter}>
                            <Arrow/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }


const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    date: {
        // flexDirection: "column"
        width: "10%",
    },
    month: {
        fontSize: 15,
        textAlign: "center",
        color: AppStyle.colors.mediumGray
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
    },
    number: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft: 0

    },
    textsWithEmoji: {
        width: "65%",
        padding: 13,
    },
    textsWithoutEmoji: {
        width: "80%",
        padding: 13
    },
    emoji: {
        fontSize: 0.09*width,
        
    },
    emojiView: {
        width: "15%",
        justifyContent: "center",
        alignItems:"center",

    },
    enter: {
        justifyContent: "center",
        alignItems:"center",
        width: "10%",
    
    }, 
    item: {
        flexDirection: "row",
        textAlign: "justify"
    },
    title: {
        fontWeight: "bold"
    },
    text: {
        flex: 1
    },
    circle: {
        width: 5,
        height: 10,
        backgroundColor: AppStyle.colors.mediumGray,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
