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
 * 
 * Utiliza os componentes: TitleDescComponent, DefaultButtonComponent e TextInputContainer
 * 
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <TitleInputContainer title="Meus dados" buttonText="Enviar"/>
 */

export default class TitleInputContainer extends Component{

    constructor () {
        super()
        this.state = {
            inputState: false
        }
    }

    callbackInput = (isInputValid) => {
        this.setState(
            {inputState: isInputValid}
        );
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
                        parentCall={this.props.requiredInput ? this.callbackInput : () => {}}
                        description={this.props.inputDescription}
                        type={this.props.keyboardType}
                    />
                    <DefautlButtonComponent
                        isDisabled={this.props.requiredInput ? !this.state.inputState : false}
                        text={this.props.buttonText}
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