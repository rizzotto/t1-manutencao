import React, { Component } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItemSubitemsComponent, Button, TitleDescription } from '../Components';
import AppStyle from '../styles';

/**
 * Container para listagem e seleção de itens/subitens.
 * 
 * Parâmetros:
 *   - `title: string`: título exibido acima da listagem;
 *   - `description: string`: descrição exibida acima da listagem;
 *   - `items: Object[]`: lista com os itens e subitens exibidos:
 *     - `title: string`: título de destaque do item;
 *     - `subitems: string[]`: lista com os subitens;
 *     - `selectedSubitems: number[]`: lista com os índices dos subitens selecionados;
 *   - `requiresAllSelected: boolean`: se `true`, o usuário terá de selecionar pelo menos um subitem em cada item; senão, o usuário pode continuar tendo selecionado qualquer quantidade de itens e subitens, inclusive nenhum;
 *   - `onComplete: (...) => void`: callback chamado quando a seleção de itens é finalizada:
 *     - `{ selectedSubitems: number[][] }`: objeto passado como parâmetro que contém os índices dos subitens selecionados em cada item;
 *   - `style`: estilos aplicados no container.
 */
export default class ListSubitemsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: (this.props.items || []).map((item) => item.selectedSubitems)
        }
    }

    /**
     * Trata o evento de seleção de um subitem, atualizando os subitens selecionados.
     */
    _onToggleSubitem = (section, row) => {
        const selected = this.state.selected.slice();

        // se a linha já está selecionada, deseleciona; senão, seleciona (apenas um subitem selecionado por vez)
        selected[section] = selected[section].includes(row) ? [] : [row];

        this.setState({ ...this.state, selected });
    }

    _renderItem = ({ item, index: section }) => {
        const selectedSubitems = this.state.selected[section];
        return <ListItemSubitemsComponent {...item}
            selectedSubitems={selectedSubitems}
            onSelectionToggle={(row) => this._onToggleSubitem(section, row)} />;
    }

    /**
     * Avalia o estado da seleção e retorna um objeto com a configuração do botão.
     * @returns {{ text: string, enabled: boolean }} `text` contém o texto a ser exibido pelo botão, e `enabled` se o botão deve estar habilitado para interação
     */
    _getButtonState = () => {
        // se todos os itens tiverem que ter um subitem selecionado
        if (this.props.requiresAllSelected) {
            // então o botão estará habilitado quando todos os itens estiverem selecionados (pelo menos um subitem selecionado)
            const allSelected = this.state.selected.every(sub => sub.length > 0);
            return { text: "Continuar", enabled: allSelected };
        } else {
            // senão, o usuário pode selecionar subitens em apenas alguns itens (ou até mesmo em nenhum)
            const anySelected = this.state.selected.some(sub => sub.length > 0);

            // se há qualquer seleção, é exibido o texto "Continuar"; senão, é exibido "Pular"
            // e o botão sempre fica habilitado (já que não há pré-condição de selecionar uma quantidade específica)
            return anySelected
                ? { text: "Continuar", enabled: true }
                : { text: "Pular", enabled: true }
        }
    }

    /**
     * Lida com o botão de continuar e avisa o pai que a seleção dessa tela foi finalizada. Constrói um objeto com os índices dos subitens selecionados e avisa o pai pela props `onComplete`.
     */
    _onButtonPress = () => {
        if (!this.props.onComplete) return;

        const result = { selectedSubitems: this.state.selected };
        this.props.onComplete(result);
    }

    render() {
        const { title, description, items, style } = this.props;
        const buttonState = this._getButtonState();

        return (
            <View style={[styles.container, style]}>
                <ScrollView>
                    <TitleDescription styleView={styles.textContainer}
                        titleText={title}
                        descriptionText={description} />
                    <FlatList
                        data={items}
                        extraData={this.state}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index + ""}
                        ItemSeparatorComponent={() => <Separator />}
                        scrollEnabled={false}
                    />
                </ScrollView>
                <Button text={buttonState.text}
                    action={this._onButtonPress}
                    isDisabled={!buttonState.enabled}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textContainer: {
        marginTop: 10,
        marginBottom: 60,
    }
});

const Separator = () => <View style={separatorStyles.line} />

const separatorStyles = StyleSheet.create({
    line: {
        width: "100%",
        height: 1,
        backgroundColor: AppStyle.colors.lightGray
    }
})
