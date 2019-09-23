import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList } from "react-native";
import Arrow from './Arrow';
/**
     * @param hasEmoji Indica se o item possui emoji de representacao de sentimento
     * @param list Lista de dados que estarao representados no item
     * @param emoji Codigo do emoji a ser inserido na lista
     * @return Component do item de historico
     * EXAMPLE:
     * <ItemHistoryComponent
            list={DATA}
            hasEmoji={true}
            emoji={"😄"}
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

                <View style={styles.item}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.number}>
                                26
                        </Text>
                        <View style={this.props.hasEmoji ? styles.textsWithEmoji : styles.textsWithoutEmoji}>
                            
                            <FlatList
                                data={this.props.list}
                                renderItem={({ item }) => (
                                    <Text style={styles.item}>
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
                        <Text style={styles.emoji}>
                            {this.props.emoji}
                        </Text>}
                        
                        <View style={styles.enter}>
                            <Arrow/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }



const styles = StyleSheet.create({

    button: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "3%"
        
    },
    number: {
        width: "10%",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",

    },
    textsWithEmoji: {
        width: "65%",
        padding: 15,
    },
    textsWithoutEmoji: {
        width: "80%",
        padding: 15
    },
    emoji: {
        fontSize: 40,
        width: "15%",
        paddingLeft: 10,

    },
    enter: {
        justifyContent: "center",
        alignItems:"center",
        width: "10%"
    
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
    }
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
