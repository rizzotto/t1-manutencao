import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import CardEmojiComponent from '../Components/CardEmojiComponent'
import { TitleDescription, Button } from '../Components';
import { SafeAreaView } from 'react-navigation';

/**
 * @author Pâmela Mendonça, Felipe Boff, Gabriel Sutério, Ardel Junior 
 * 
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <CardEmojiContainer></CardEmojiContainer>
 */



export default class CardEmojiContainer extends Component {
    state = {
        selectedEmoji: null,
        DATA : [
            { text: "Raiva", emoji: "😡", isSelected: false },
            { text: "Cansado", emoji: "😞", isSelected: false},
            { text: "Chateado", emoji: "😕", isSelected: false},
            { text: "Contente", emoji: "🙂", isSelected: false},
            { text: "Feliz", emoji: "😄", isSelected: false},
            { text: "Tanto Faz", emoji: "😐", isSelected: false}
        ]
    };

    
    selectItem = (item) => {
        const index = this.state.DATA.indexOf(item);
        const wasSelected = this.state.DATA[index].isSelected;

        this.state.DATA.forEach(item => item.isSelected = false);

        this.state.DATA[index].isSelected = !wasSelected;
        
        this.setState({
            selectedEmoji: item,
        });      
        
    }


    emojiSelected = () => {
        this.props.callback(this.state.selectedEmoji);
    }


    render() {
        return (
            <SafeAreaView>

                <TitleDescription titleText={"Como está seu humor hoje?"} />

                <FlatList
                    data={this.state.DATA}
                    keyExtractor={item => item.text}
                    numColumns={3}
                    extraData={this.state}
                    renderItem={({ item }) => (
                                <CardEmojiComponent 
                                    text={item.text} 
                                    emoji={item.emoji} 
                                    onPress={() => this.selectItem(item)}
                                    selected={item.isSelected}
                                />
                        )
                    }
                />

                <Button
                    action={this.emojiSelected}
                    isDisabled={this.state.selectedEmoji == null}
                    text={"Continuar"}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 2,
        marginLeft: 5,
        marginRight: 5,
    },
    title: {
        marginTop: 50,
        marginBottom: 40
    }
})