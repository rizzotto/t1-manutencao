import React, { Component } from 'react';
import { FlatList, View, Text, Item, StyleSheet, SafeAreaView } from 'react-native';

/**
 * @author Bruno Guerr e Eduardo Lessa
 * Contaier com carrossel de itens, passados por props.
 * @param data array com os dados a serem mostrados no carrosel
 */

export default class CarouselContainer extends Component {

    render() {

        function Item({ emoji, title }) {
            return (
                <View style={styles.item}>
                    <Text style={styles.emoji}>{emoji}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            );
        }

        return (

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.props.data || DATA}
                    renderItem={({ item }) => <Item title={item.nome} emoji={item.emoji} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: 110,
        height: 130,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 4
    },
    emoji: {
        fontSize: 40,
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 16,
        alignItems: 'center',
        alignSelf: 'center',
    }
});