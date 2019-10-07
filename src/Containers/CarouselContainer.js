import React, { Component } from 'react';
import { FlatList, View, Text, Item, StyleSheet, SafeAreaView } from 'react-native';
import CardEmojiComponent from '../Components/CardEmojiComponent'; 
import Arrow from '../Components/Arrow';

/**
 * @author Bruno Guerra e Eduardo Lessa
 * Container com carrossel de itens, passados por props.
 * @param data array com os dados a serem mostrados no carrosel
 */

const DATA = [
    { text: "Raiva", emoji: "😡", isSelected: false },
    { text: "Cansado", emoji: "😞", isSelected: false},
    { text: "Chateado", emoji: "😕", isSelected: false},
    { text: "Contente", emoji: "🙂", isSelected: false},
    { text: "Feliz", emoji: "😄", isSelected: false},
    { text: "Tanto Faz", emoji: "😐", isSelected: false}
];

export default class CarouselContainer extends Component {

    handlePress(item){
        this.props.action(item);
    }

    render() {

        return (

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.props.data || DATA}
                    renderItem={({ item }) => (
                    <View>
                        <CardEmojiComponent
                        text={item.text}
                        emoji={item.emoji}
                        onPress={() => this.handlePress(item)}
                        />
                    </View>
                    )}
                    keyExtractor={item => item.text }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Arrow></Arrow>
            </SafeAreaView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    }
});