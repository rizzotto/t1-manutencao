import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import createDefaultNavigationOption from './CreateDefaultNavigationOptions';
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
 *   - `content`: conteúdo a ser inicialmente exibido no campo de texto,
 *   - `keyboardType`: tipo de teclado (ver `Containers/TitleInputContainer`);
 *   - `required`: se é requerido que o usuário entre com alguma informação na tela;
 *   - `onComplete`: função chamada quando o usuário confirma o dado inserido;
 *   - `onCancel`: função chamada quando o usuário clica no botão `Cancelar` no header;
 *   - `inputMask`: (opcional) tipo da mascara do input
 *   - `title`: título exibido no header.
 */
export default class TextInputScreen extends Component{

    static navigationOptions = createDefaultNavigationOption;

    _onComplete = (result) => {
        const onComplete = this.getParam("onComplete");
        if (!onComplete) return;
        onComplete(result);
    }

    render() {
        const progress = this.getParam("progress", 0);
        const callout = this.getParam("callout");
        const description = this.getParam("description");
        const placeholder = this.getParam("placeholder");
        const content = this.getParam("content");
        const keyboardType = this.getParam("keyboardType");
        const required = this.getParam("required", false);
        const mask = this.getParam("inputMask");

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress} style={styles.progressBar} />
                <SimpleTextInputContainer
                    title={callout}
                    description={description}
                    buttonText="Continuar"
                    altBtnText="Pular"
                    inputDescription={placeholder}
                    initialContent={content}
                    keyboardType={keyboardType}
                    requiredInput={required}
                    callbackToScreen={this._onComplete}
                    maskType={mask}
                />
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progressBar: {
        zIndex: 100
    }
});
