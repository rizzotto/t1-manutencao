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


export default class CardEmojiContainer extends Component{
    state = {
        data: [
          { text: "Raiva", emoji: "😡" },
          { text: "Cansado", emoji: "😞" },
          { text: "Chateado", emoji: "😕" },
          { text: "Contente", emoji: "🙂" },
          { text: "Feliz", emoji: "😄" },
          { text: "Tanto Faz", emoji: "😐" }
        ]
      };
   
    
    render(){

        return (
            <SafeAreaView>

                <View style={styles.title}>
                    <TitleDescription titleText={"Como está seu humor hoje?"}/>
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.text}
                    numColumns={3}
                    renderItem={({ item }) => {
                        return (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            <CardEmojiComponent text={item.text} emoji={item.emoji}/>
                        </View>
                        );
                    }}
                    />
                    
                    <Button
                        isDisabled={false}
                        text={"Mude-me"}
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