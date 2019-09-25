import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ListSubitemsContainer } from '../Containers';
import { ProgressBar } from '../Components';
import CreateDefaultNavigationOptions from './CreateDefaultNavigationOptions';

/**
 * Tela de listagem com subitens.
 * 
 * Parâmetros (via `props` e `navigation.params`):
 *   - `data`: dados exibidos; ver `Container/ListSubitemsContainer`;
 *   - `onComplete`: função chamada quando o botão "Continuar" é clicado, onde o único parâmetro é uma lista com os índices dos subitens selecionados (ex. `[[1, 2], [], [0, 3]]`);
 *   - `onCancel`: função chamada quando o botão "Cancelar" é clicado.
 *   - `headerRightTitle`: string com texto do botão na direita do header;
 *   - `title`: string com título da tela exibido no header.
 *   - `progress`: procentagem exibida na progress bar (ver `Components/ProgressBar`).
 */
export default class ListSubitemsScreen extends Component {
    static navigationOptions = CreateDefaultNavigationOptions;

    _onComplete = ({ selectedSubitems }) => {
        const onComplete = this.getParam("onComplete");
        if (!onComplete) return;
        onComplete(selectedSubitems);
    }

    render() {
        const progress = this.getParam("progress", 0);
        const data = this.getParam("data", {});

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress} />
                <ListSubitemsContainer {...data}
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
