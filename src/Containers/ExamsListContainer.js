import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ExamItemContainer from './ExamItemContainer';

/**
 * Container de lista de exames.
 * 
 * Parâmetros:
 * - `data`: lista com exames a serem exibidos, onde cada objeto tem as seguintes propriedades:
 *   - `title`: título do exame
 *   - `description`: descrição do exame
 *   - `date`: data de cadastro do exame
 *   - `images`: lista de imagens dos exames, com objetos no formato esperado pelo `ImageComponent` (ver exemplo abaixo)
 * - `onSelect`: função chamada quando um exame é tocado; índice do exame é passado como parâmetro
 * - `style`: estilo aplicado à lista
 * 
 * Exemplo de uso:
 * 
 *     <ExamsListContainer
 *         data={[
 *             {
 *                 title: "Dr. Carlos",
 *                 description: "Exame de sangue, cardiograma, hemograma, mais texto",
 *                 date: new Date("2019-10-10"),
 *                 images: [{ promise: Promise.value("...url") }, { sourceImage: require("...path") }]
 *             }
 *         ]}
 *     >
 * />
 */
export default class ExamsListContainer extends Component {
    /**
     * Função chamada quando um exame é clicado.
     * @param {number} index índice do elemento clicado
     */
    onSelect = (index) => {
        const onSelect = this.props.onSelect
        if (!onSelect) return;
        onSelect(index)
    }

    render() {
        return (
            <FlatList style={[styles.list, this.props.style]}
                data={this.props.data}
                renderItem={({ item, index }) => (
                    <ExamItemContainer { ...item }
                        style={styles.item}
                        onPress={() => this.onSelect(index)} />
                )}
                keyExtractor={(item) => `exam#${item.date.getTime()}` }
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        marginVertical: 10
    },
    item: {
        marginHorizontal: 20,
        marginVertical: 10
    }
})
