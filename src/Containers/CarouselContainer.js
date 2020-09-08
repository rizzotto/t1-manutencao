import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import CardEmojiComponent from '../Components/CardEmojiComponent'; 
import { Arrow } from '../Components';

/**
 * @author Bruno Guerra e Eduardo Lessa
 * Container com carrossel de itens, passados por props.
 * @param {array} data com os dados a serem mostrados no carrosel
 * @param {function} action função a ser executada ao clicar no card do emoji
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
    constructor(props) {
        super(props)

        const itemsPerPage = 3
        const data = props.data || DATA

        this.state = {
            page: 0,
            data,
            maxPages: Math.ceil(data.length / itemsPerPage),
            itemsPerPage
        }
    }

    handlePress(item){
        this.props.action(item);
    }

    showNextPage = () => {
        const { page: currentPage, itemsPerPage } = this.state
        const nextPageIndex = (currentPage + 1) * itemsPerPage

        this.listRef.scrollToIndex({ index: nextPageIndex, animated: true, viewPosition: 0 })
        this.setState({ ...this.state, page: currentPage + 1 })
    }

    showPreviousPage = () => {
        const { page: currentPage, itemsPerPage } = this.state
        const previousPageIndex = (currentPage - 1) * itemsPerPage

        this.listRef.scrollToIndex({ index: previousPageIndex, animated: true, viewPosition: 0 })
        this.setState({ ...this.state, page: currentPage - 1 })
    }

    render() {
        const { page, maxPages } = this.state
        const isFirstPage = page === 0
        const isLastPage = page === maxPages - 1

        return (
            <View style={styles.container}>
                <Arrow direction="left" onPress={this.showPreviousPage} disabled={isFirstPage} />
                <FlatList
                    ref={(list) => this.listRef = list}
                    data={this.props.data || DATA}
                    renderItem={({ item }) => (
                        <CardEmojiComponent style={styles.item}
                            text={item.text}
                            emoji={item.emoji}
                            onPress={() => this.handlePress(item)}
                        />
                    )}
                    keyExtractor={item => item.text}
                    scrollEnabled={false}
                    horizontal={true}
                    pagingEnabled={true}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                />
                <Arrow direction="right" onPress={this.showNextPage} disabled={isLastPage} />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    },
    item: {
        marginHorizontal: 4,
        marginVertical: 10,
        minHeight: 130,

        // a FlatList não é horizontal, então a largura dos itens não vem dela
        // (como foi feito no CardEmojiContainer), mas dos itens em si;
        // ou é definir a largura "na mão", ou se aventurar com FlatLists
        // muito aninhadas e com direções de scroll diferentes
        // (o que não temos tempo para fazer no momento);
        // ainda não fica perfeito em telas de qualquer tamanho,
        // mas é o que dá para fazer com o tempo que temos
        
        // width: Dimensions.get("window").width * 0.25
    }
});