import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import Arrow from './Arrow';
import AppStyle from '../styles';
/**
     * @param hasEmoji Indica se o item possui emoji de representacao de sentimento
     * @param list Lista de dados que estarao representados no item
     * @param emoji Codigo do emoji a ser inserido na lista
     * @param day Dia do Item que fora adicionado 
     * @param styleTest Estilo aplicado ao componente
     * @return Component do item de historico
     * EXAMPLE:
     * <ItemHistoryComponent
            list={DATA}
            hasEmoji={true}
            emoji={'😄'}
            day={'15'}
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
    state = {
        date: this.props.date
    }
    dataToContainer = () => {
        this.props.callback(this.state);
    }
    render(){
        const date = this.state.date
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() 
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() 
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() 

        return (

            <View style={[styles.button, this.props.styleTest]}>
                    <View style={styles.circle}/>
                    <TouchableOpacity style={styles.button} onPress={() => this.dataToContainer()}>
                    <View style={styles.date}>
                        <Text style={styles.day}>
                            {day}
                        </Text>
                        <Text style={styles.month}>

                            {hour+':'+minute}
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

const styles = StyleSheet.create({
    date: {
        minWidth: 40,
        marginLeft: 5
    },
    month: {
        fontSize: 14,
        textAlign: 'center',
        color: AppStyle.colors.mediumGray
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    day: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 0,
        color: AppStyle.colors.darkText

    },
    textsWithEmoji: {
        flex: 1,
        padding: 13,
    },
    textsWithoutEmoji: {
        flex: 1,
        padding: 13
    },
    emoji: {
        fontSize: 40,
        textAlign: "center"
    },
    emojiView: {
        minWidth: 50,
        justifyContent: 'center',
        alignItems:'center',

    },
    enter: {
        justifyContent: 'center',
        alignItems:'center',
    
    }, 
    item: {
        flexDirection: 'row',
        textAlign: 'justify',
        marginVertical: 2,
        color: AppStyle.colors.darkText,
        fontSize: 13
    },
    title: {
        fontWeight: 'bold'
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
