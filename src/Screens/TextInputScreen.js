import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import createDefaultNavigationOption from './createDefaultNavigationOptions';
import { SimpleTextInputContainer } from '../Containers';
import { ProgressBar } from '../Components';

/**
 * Tela de entrada de texto.
 * 
 * Parâmetros:
 *   - `progress`: progresso exibido na barra de progresso, no intervalo [0, 1];
 *   - `callout`: texto exibido como título, acima da descrição;
 *   - `description`: descrição daquilo que o usuário deve inserir, abaixo do título;
 *   - `placeholder`: conteúdo do campo de texto quando o mesmo está vazio;
 *   - `keyboardType`: tipo de teclado (ver `Containers/TitleInputContainer`);
 *   - `required`: se é requerido que o usuário entre com alguma informação na tela;
 *   - `onComplete`: função chamada quando o usuário confirma o dado inserido;
 *   - `onCancel`: função chamada quando o usuário clica no botão `Cancelar` no header;
 *   - `title`: título exibido no header.
 */
export default class TextInputScreen extends Component{

    static navigationOptions = createDefaultNavigationOption;

    _onComplete = (result) => {
        const onComplete = this.props.onComplete || this.props.navigation.getParam("onComplete");
        if (!onComplete) return;
        onComplete(result);
    }

    render() {
        const progress = this.props.progress || this.props.navigation.getParam("progress", 0);
        const callout = this.props.callout || this.props.navigation.getParam("callout");
        const description = this.props.description || this.props.navigation.getParam("description");
        const placeholder = this.props.placeholder || this.props.navigation.getParam("placeholder");
        const keyboardType = this.props.keyboardType || this.props.navigation.getParam("keyboardType");
        const required = this.props.required || this.props.navigation.getParam("required");

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress} />
                <SimpleTextInputContainer
                    title={callout}
                    description={description}
                    buttonText="Continuar"
                    altBtnText="Pular"
                    inputDescription={placeholder}
                    keyboardType={keyboardType}
                    requiredInput={required}
                    callbackToScreen={this._onComplete}
                />
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
