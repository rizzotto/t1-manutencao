import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, SectionList} from 'react-native';
import ItemHistoryComponent from '../Components/ItemHistoryComponent';
import AppStyle from '../styles';
/**
     * @param section listagem com todos itens que estarao dentro da lista 
     *      Elementos que devem ser passados dentro da section são:
     *      @param title: mes/ano
     *      @param data: Lista de itens que são exibidos no container
     *          @param emoji: emoji passado para o item
     *          @param date: data passada para o container
     *          @param list: Lista de itens exibidos no componente, como pressão e medicamentos, passados em list
     *              @param id: Título (ex: Pressão)
     *              @param title: Conteúdo do título
     * @param action o que deve ser realizado quando um item for clicado 
     * @param hasEmoji: indica se o componente possui emojis
     * @return Container da listagem do container
     * 
     * exemplo:
     * const items = [
            {
            id: 'Pressão: ',
            title: '10,9',
            },
        ];

        const history2017 = [
            {
                list: items,
                emoji: '😡',
                date: new Date()
                
            },
        ];

        const data = new Date()
        const section = [
            {
            title: (data.getMonth()+1) + '/' + data.getFullYear(),
            data: history2017
            },
        ]; 

        export default class HistoryScreen extends Component {
            render(){
                return(
                    <HistoryContainer
                        mes={'Histórico'}
                        section={section}
                        hasEmoji={true}
                    />
                )
            }
        }
     */

export default class HistoryContainer extends Component {

    render(){
        return(
            <View style={styles.container} >
                <SectionList
                    stickySectionHeadersEnabled={true}
                    sections={this.props.section}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => 
                        <ItemHistoryComponent styleTest={styles.list}
                            callback={(data) => this.props.action(data.date)}
                            list={item.list}
                            hasEmoji={this.props.hasEmoji}
                            emoji={item.emoji}
                            date={item.date}
                        />
                    }
                    showsVerticalScrollIndicator = {false}
                    ItemSeparatorComponent={() => <Separator />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.year}>{title}</Text>
                    )}
                />
            </View>
        )
    }
}
const Separator = () => (
    <View style={styles.separatorContainer}>
        <View style={styles.line} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    separatorContainer: {
        borderLeftColor: AppStyle.colors.mediumGray,
        borderLeftWidth: 1,
        marginHorizontal: 20
    },
    line: {
        height: 1,
        backgroundColor: AppStyle.colors.mediumGray,
        width: "85%",
        alignSelf: "flex-end"
    },
    list: {
        borderColor: AppStyle.colors.mediumGray,
        borderLeftWidth: 1,
        marginHorizontal: 20
    },
    year: {
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        width: '100%',
        zIndex: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: AppStyle.colors.darkText
    }
})