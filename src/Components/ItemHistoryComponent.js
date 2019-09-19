import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import AppStyle from '../styles';
    
export default class ItemHistoryComponent extends Component {
        render(){
            return (
                <View >
                    <TouchableOpacity style={styles.button}>
                        <Text >
                                26
                        </Text>
                        <View style={styles.texts}>
                            <Text >
                                Pressão: Alta
                            </Text>
                            <Text >
                                Sintomas: Dor de Cabeça
                            </Text>
                            <Text >
                                Medicamentos: Dorflex
                            </Text>
                        </View>
                        <Text >
                                :)
                        </Text>
                        <Text >
                                >
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }



const styles = StyleSheet.create({
    button: {
        flexDirection: "row"
    },
    texts: {
        flex: 1
    },
        
})

