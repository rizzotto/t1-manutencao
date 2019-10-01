import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { TitleDescription, Button } from '../Components';
import TextInputContainer from './TextInputContainer';

/**
 * @author Bruno Guerra e Eduardo Lessa
 * @author Updated by Gabriel Franzoni e Mathias Voelcker
 * @param title String com o título a ser exibido
 * @param description String com a descrição doUso do TextInsertContainer título (opcional)
 * @param titleDescViewStyle StyleSheet com os estilos do <View> do componente TitleDescComponent (opcional)
 * @param titleDescStyle StyleSheet com os estilos do texto do componente TitleDescComponente (opcional)
 * @param requiredInput Booleano que indica se o input é obrigatório ou não
 * @param inputDescription Descrição do input do TextInputContainer
 * @param initialContent Conteúdo inicial do input do TextInputContainer
 * @param keyboardType Tipo do teclado do TextInputContainer
 * @param buttonText Texto do botão do container
 * @param altBtnText Texto alternativo do botão
 * @param btnAction (Opcional) Ação (função) que o botão deve executar quando clicado. Por padrão, envia os dados para o componente pai utilizando callback.
 * 
 * Utiliza os componentes: TitleDescComponent, DefaultButtonComponent e TextInputContainer
 * 
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <TitleInputContainer title="Meus dados" buttonText="Enviar"/>
 */

export default class MultiTitleInputContainer extends Component{

    constructor (props) {
        super()
        this.state = {
            inputState: false,
            inputValue: [],
            disabledButton: props.requiredInput,
            btnText: props.requiredInput ? props.buttonText : (props.altBtnText) ? props.altBtnText : props.buttonText
        }
        for (let i = 0; i < props.initialContent.length; i++) {
            this.state.inputValue.push(props.initialContent[i])
        }
    }

    screenHeight = Math.round(Dimensions.get('window').height);


    notEmpty = (text) => { return !!text; }

    /**
     * @function btnStateCheck
     * Verifica o states do botão, realizando mudanças caso seja necessário
     */
    btnStateCheck = () => {
        if(this.props.requiredInput){
            let allValid = this.state.inputValue.every(this.notEmpty)
            if(!allValid){
                this.setState({disabledButton: true});
            }
            else{
                this.setState({disabledButton: !this.state.inputState});
            }
        }
        else{
            if(!allValid){
                this.setState({btnText: this.props.altBtnText ? this.props.altBtnText : this.props.buttonText, disabledButton: false});
            }
            else{
                this.setState({disabledButton: !this.state.inputState, btnText: this.props.buttonText});
            }
        }
    }

    /**
     * @function updateInputState
     * @param isInputValid boolean indica se o valor do input é valido conforme configuração
     * Atualiza os states referentes ao botão e posteriormente, chama a função btnStateCheck
     */
    updateInputState = (isInputValid) => {
        this.setState({inputState: isInputValid},
        () => {
            this.btnStateCheck();
        })
    }

    /**
     * @function updateInputValue
     * @param inputValue String com o valor atual do input.
     * Atualiza o estado com o valor do input quando o usuário digita.
     */
    updateInputValue = (inputValue, index) => {
        this.state.inputValue[index] = inputValue;
        this.setState({inputValue: this.state.inputValue});
    }

    /**
     * @function dataToScreen
     * Função utilizada para enviar os dados para a screen, utilizando callback.
     */
    dataToScreen = () => {
        this.props.callbackToScreen(this.state.inputValue);
    }
    
    /**
     * @function listInputs
     * Função utilizada para criar mapear várias entradas de texto para uma única tela.
     */
    listInputs = () => {
        let inputs = [];
        for (let i = 0; i < this.props.initialContent.length; i++) {
            inputs.push(
                <View>
                    <Text style={styles.descriptionView}>{this.props.description[i]}</Text>
                    <TextInputContainer
                        initialContent={this.props.initialContent[i]}
                        validateCallback={this.updateInputState}
                        textCallback={this.updateInputValue}
                        description={this.props.inputDescription[i]}
                        type={this.props.keyboardType[i]}
                        index={i}
                        />
                </View>
                )
        }
        return inputs;
    }


    render(){

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView 
                    style={styles.container} style={{flexGrow: 1}}
                    contentContainerStyle={{flexGrow: 1}}
                    ref='scroll'>
                    <View style={styles.content}>
                        <TitleDescription
                            titleText={this.props.title}
                            styleTitle={this.props.titleDescStyle}
                            styleView={[styles.titleView, this.props.titleDescViewStyle]}
                        />
                            {this.listInputs()}
                    </View>
                    <Button
                        isDisabled={this.state.disabledButton}
                        text={this.state.btnText}
                        action={this.props.btnAction || this.dataToScreen}
                        />
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
    },
    titleView: {
        marginTop: 10,
        marginBottom: 60
    },
    descriptionView: {
        marginTop: 10,
        marginHorizontal: 20,
        minHeight: 40,
        fontSize: 23,
        textAlign: 'left'
    }
})