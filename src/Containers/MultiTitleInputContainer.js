import React, { Component } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { TitleDescription, Button } from '../Components';
import TextInputContainer from './TextInputContainer';

/**
 * @author Bruno Guerra e Eduardo Lessa
 * @param title String com o título a ser exibido
 * @param description String com a descrição doUso do TextInsertContainer título (opcional)
 * @param titleDescViewStyle StyleSheet com os estilos do <View> do componente TitleDescComponent (opcional)
 * @param titleDescStyle StyleSheet com os estilos do texto do componente TitleDescComponente (opcional)
 * @param requiredInput Booleano que indica se o input é obrigatório ou não
 * @param inputDescription Descrição do input do TextInputContainer
 * @param initialContent Conteúdo inicial do input do TextInputContainer
 * @param keyboardType Tipo do teclado do TextInputContainer
 * @param buttonViewStyle StyleSheet com os estilos do <ScrollView> do componente DefaultButtonComponent
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
            inputValue: "",
            disabledButton: props.requiredInput,
            btnText: props.requiredInput ? props.buttonText : (props.altBtnText) ? props.altBtnText : props.buttonText
        }
    }

    screenHeight = Math.round(Dimensions.get('window').height);


    /**
     * @function btnStateCheck
     * Verifica o states do botão, realizando mudanças caso seja necessário
     */
    btnStateCheck = () => {
        if(this.props.requiredInput){
            if(this.state.inputValue == ""){
                this.setState({disabledButton: true});
            }
            else{
                this.setState({disabledButton: !this.state.inputState});
            }
        }
        else{
            if(this.state.inputValue == ""){
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
    updateInputValue = (inputValue) => {
       this.setState({inputValue: inputValue});
    }

    /**
     * @function dataToScreen
     * Função utilizada para enviar os dados para a screen, utilizando callback.
     */
    dataToScreen = () => {
        this.props.callbackToScreen(this.state.inputValue);
    }
    
    listInputs = () => {
        let inputs = [];
        for (let i = 0; i < this.props.initialContent.length; i++) {
            inputs.push(<TextInputContainer
                initialContent={this.props.initialContent[i]}
                validateCallback={this.updateInputState}
                textCallback={this.updateInputValue}
                description={this.props.inputDescription[i]}
                type={this.props.keyboardType[i]}
            />)
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
                    {/* <KeyboardAvoidingView 
                        behavior="padding"
                        style={styles.container}
                        // keyboardVerticalOffset={30}
                        > */}
                        <View style={styles.content}>
                            <TitleDescription
                                titleText={this.props.title}
                                descriptionText={this.props.description}
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
                    {/* </KeyboardAvoidingView> */}
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
    }
})