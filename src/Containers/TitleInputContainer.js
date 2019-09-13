import React, {Component} from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import TitleDescComponent from "../Components/TitleDescComponent";
import DefautlButtonComponent from "../Components/defaultButtonComponent";
import TextInputContainer from "../Containers/TextInputContainer";

/**
 * @author Bruno Guerra e Eduardo Lessa
 * @param title String com o título a ser exibido
 * @param description String com a descrição doUso do TextInsertContainer título (opcional)
 * @param titleDescViewStyle StyleSheet com os estilos do <View> do componente TitleDescComponent (opcional)
 * @param titleDescStyle StyleSheet com os estilos do texto do componente TitleDescComponente (opcional)
 * @param obrigatoryInput Booleano que indica se o input é obrigatório ou não
 * @param inputDescription Descrição do input do TextInputContainer
 * @param keyboardType Tipo do teclado do TextInputContainer
 * @param buttonViewStyle StyleSheet com os estilos do <View> do componente DefaultButtonComponent
 * @param buttonText Texto do botão do container
 * @param altBtnText Texto alternativo do botão
 * 
 * Utiliza os componentes: TitleDescComponent, DefaultButtonComponent e TextInputContainer
 * 
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <TitleInputContainer title="Meus dados" buttonText="Enviar"/>
 */

export default class TitleInputContainer extends Component{

    constructor (props) {
        super()
        this.state = {
            inputState: false,
            inputValue: "",
            disabledButton: props.requiredInput,
            btnText: props.requiredInput ? props.buttonText : (props.altBtnText) ? props.altBtnText : props.buttonText
        }
    }

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
     * @function callbackInput
     * @param isInputValid boolean indica se o valor do input é valido conforme configuração
     * @param inputText string valor atual do input
     * Atualiza os states referentes ao botão e posteriormente, chama a função btnStateCheck
     */
    callbackInput = (isInputValid, inputText) => {
        this.setState(
            {
                inputState: isInputValid,
                inputValue: inputText
            },
        () => {
            this.btnStateCheck();
        })
    }

    render(){

        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View> 
                    <TitleDescComponent 
                        titleText={this.props.title} 
                        descriptionText={this.props.description} 
                        styleTitle={[styles.title, this.props.titleDescStyle]} 
                        styleView={[styles.titleView, this.props.titleDescViewStyle]}
                    />  
                    <TextInputContainer
                        parentCall={this.callbackInput}
                        description={this.props.inputDescription}
                        type={this.props.keyboardType}
                    />
                    <DefautlButtonComponent
                        isDisabled={this.state.disabledButton}
                        text={this.state.btnText}
                        viewStyle={[styles.buttonView, this.props.buttonViewStyle]}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        justifyContent: 'flex-start'
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40
    }
})