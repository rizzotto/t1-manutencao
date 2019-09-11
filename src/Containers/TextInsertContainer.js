/**
 * Container para tela com título, input de texto e botão para ação.
 * Utiliza os componentes: TitleDescComponent, DefaultButtonComponent e TextInputContainer
 * Autores: Bruno Guerra e Eduardo Lessa
 */

import React, {Component} from 'react';
import { View, StyleSheet } from "react-native";
import TitleDescComponent from "../Components/titleDescComponent";
import DefautlButtonComponent from "../Components/defaultButtonComponent";
import TextInputContaier from "../Containers/TextInputContainer";

export default class TextInsertContainer extends Component{

    /**
     * Parâmetros
     * @param title String com o título a ser exibido
     * @param description String com a descrição doUso do TextInsertContainer título (opcional)
     * @param titleDescViewStyle StyleSheet com os estilos do <View> do componente TitleDescComponent (opcional)
     * @param titleDescStyle StyleSheet com os estilos do texto do componente TitleDescComponente (opcional)
     * @param inputDescription Descrição do input do TextInputContainer
     * @param keyboardType Tipo do teclado do input
     * @param buttonViewStyle StyleSheet com os estilos do <View> do componente DefaultButtonComponent
     * @param buttonText Texto do botão do container
     * 
     * Uso do StyleSheet: StyleSheet.create({ ... });
     * 
     * Exemplo de uso: <TextInsertContainer title="Meus dados" buttonText="Enviar"/>
     */

    render(){
        return(
            <View> 
                <TitleDescComponent 
                    titleText={this.props.title} 
                    descriptionText={this.props.description} 
                    styleTitle={[styles.title, this.props.titleDescStyle]} 
                    styleView={[styles.titleView, this.props.titleDescViewStyle]}
                />
                <TextInputContaier 
                    description={this.props.inputDescription}
                    keyboardType={this.props.keyboardType}
                />
                <DefautlButtonComponent 
                    text={this.props.buttonText}
                    viewStyle={[styles.buttonView, this.props.buttonViewStyle]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        marginLeft: 8,
        marginRight: 8
    },
    titleView: {
        justifyContent: 'flex-start',
        marginTop: 25
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40
    }
})