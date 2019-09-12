import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { ListSubitems } from '../Containers';
import createDefaultNavigationOptions from './createDefaultNavigationOptions';
import { ProgressBar } from '../Components';

/**
 * Tela de listagem com subitens.
 * 
 * Parâmetros (via `props` e `navigation.params`):
 *   - `data`: dados exibidos; ver `Container/ListSubitems`;
 *   - `onComplete`: função chamada quando o botão "Continuar" é clicado, onde o único parâmetro é uma lista com os índices dos subitens selecionados (ex. `[[1, 2], [], [0, 3]]`);
 *   - `onCancel`: função chamada quando o botão "Cancelar" é clicado.
 *   - `headerRightTitle`: string com texto do botão na direita do header;
 *   - `title`: string com título da tela exibido no header.
 *   - `progress`: procentagem exibida na progress bar (ver `Components/ProgressBar`).
 */
export default class ListSubitemsScreen extends Component {
    static navigationOptions = createDefaultNavigationOptions;

    _onComplete = ({ selectedSubitems }) => {
        const onComplete = this.props.onComplete || this.props.navigation.getParam("onComplete");
        if (!onComplete) return;
        onComplete(selectedSubitems);
    }

    render() {
        const progress = this.props.progress || this.props.navigation.getParam("progress", 0);
        const data = this.props.data || this.props.navigation.getParam("data");

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress} />
                <ListSubitems {...data}
                    requiresAllSelected={false}
                    onComplete={this._onComplete} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch"
    }
});
