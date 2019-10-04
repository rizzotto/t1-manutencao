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

    callback = (state) => {
        console.warn(state.date)
    }
    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Histórico</Text>
                <SectionList
                    stickySectionHeadersEnabled={true}
                    sections={this.props.section}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => 
                        <ItemHistoryComponent styleTest={styles.list}
                            callback={this.callback}
                            list={item.list}
                            hasEmoji={this.props.hasEmoji}
                            emoji={item.emoji}
                            date={item.date}
                            action={this.props.action}
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
const Separator = () => <View style={styles.line} />
const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 43,
    },
    line: {
        width: '85%',
        height: 1,
        backgroundColor: AppStyle.colors.mediumGray,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0
    },
    list: {
        borderColor: AppStyle.colors.mediumGray,
        borderLeftWidth: 1,
        padding:5,
        paddingLeft:0
    },
    year: {
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        width: '100%',
        zIndex: 10,
        paddingVertical: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingBottom: 10
    }

})