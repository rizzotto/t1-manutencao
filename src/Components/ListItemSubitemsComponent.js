import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import AppStyle from '../styles';
import CheckImage from './CheckImage';
import ItemListComponent from './ItemListComponent';

/**
 * Item de listagem com subitens.
 * 
 * Parâmetros:
 *   - `title: string`: título usado no topo do item;
 *   - `subitems: string[]`: subitens exibidos;
 *   - `selectedSubitems: number[]`: array com índices dos subitens selecionados (em `subitems`);
 *   - `onSelectionToggle: (index: number) => void`: função chamada quando um subitem é selecionado (índice passado como parâmetro);
 *   - `style`: estilos aplicados no container.
 */
export default class ListItemSubitemsComponent extends Component {
    /**
     * Se um item em um índice deve ser renderrizado como selecionado.
     * @param {number} index índice do item
     * @returns {boolean} `true` se o item deve ser selecionado, senão `false`
     */
    _isSelected = (index) => {
        if (!this.props.selectedSubitems) return false;
        return this.props.selectedSubitems.includes(index);
    }

    /**
     * Ação executada quando um subitem é selecionado. Delega para `Props.onSelectionToggle`, se fornecido.
     * @param {number} index índice do item selecionado
     */
    _onSubitemPress = (index) => {
        // notificar pai da atualização na seleção
        if (!this.props.onSelectionToggle) return;
        this.props.onSelectionToggle(index);
    }

    _renderSubitem = ({ item, index }) => {
        const selected = this._isSelected(index);
        return <Subitem text={item} selected={selected} onPress={() => this._onSubitemPress(index)} />;
    }

    render() {
        const { title, subitems, selectedSubitems = [], style } = this.props;
        const hasSelectedItems = selectedSubitems.length != 0;

        return (
            <View style={[styles.container, style]}>
                <ItemListComponent text={title} selected={hasSelectedItems} pressDisabled />
                <Text style={styles.subtitle}>Indique a frequência:</Text>
                <FlatList style={styles.list}
                    data={subitems}
                    renderItem={this._renderSubitem}
                    ItemSeparatorComponent={() => <SubitemSeparator />}
                    keyExtractor={(item, index) => index + ""}
                    scrollEnabled={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppStyle.colors.background
    },
    subtitle: {
        marginTop: 5,
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: Platform.OS === "android" ? "normal" : "500"
    },
    list: {
        marginVertical: 10,
        marginHorizontal: 20
    }
});

/**
 * Subitem usado na listagem.
 * 
 * Parâmetros:
 *   - `text: string`: texto exibido no subitem
 *   - `selected: boolean`: `true` se o item deve ser renderizado como selecionado
 *   - `onPress: function`: função chamada quando o subitem é clicado
 */
const Subitem = ({ text, selected, onPress }) => {
    const subitemStyles = createSubitemStyles(selected);

    return (
        <TouchableOpacity style={subitemStyles.container} onPress={onPress}>
            <Text style={subitemStyles.text}>{text}</Text>
            { selected && <CheckImage /> }
        </TouchableOpacity>
    );
}

const createSubitemStyles = (selected) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: selected ? AppStyle.colors.lightGray : AppStyle.colors.background
        },
        text: {
            flex: 1,
            fontSize: 16,
            color: AppStyle.colors.darkText
        }
    })
}

/**
 * Separador entre os subitens.
 */
const SubitemSeparator = () => <View style={separatorStyles.line} />

const separatorStyles = StyleSheet.create({
    line: {
        width: "100%",
        height: 1,
        backgroundColor: AppStyle.colors.lightGray
    }
})
