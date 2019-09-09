/**
 * Container para tela com título, input de texto e botão para ação.
 * Utiliza os componentes: TitleDescComponent, DefaultButtonComponent e ...
 * Autores: Bruno Guerra e Eduardo Lessa
 */

import React, {Component} from 'react';
import { View, StyleSheet } from "react-native";
import TitleDescComponent from "../Components/titleDescComponent";
import DefautlButtonComponent from "../Components/defaultButtonComponent";

export default class TextInsertContainer extends Component{

    /**
     * Parâmetros
     * @param title string com o título a ser exibido
     * @param description string com a descrição doUso do TextInsertContainer título (opcional)
     * @param titleDescViewStyle StyleSheet com os estilos do <View> do componente TitleDescComponent (opcional)
     * @param titleDescStyle StyleSheet com os estilos do texto do componente TitleDescComponente (opcional)
     * @param buttonViewStyle StyleSheet com os estilos do <View> do componente DefaultButtonComponent
     * @param buttonText texto do botão do container
     * 
     * Uso do StyleSheet: StyleSheet.create({ ... });
     * 
     * Exemplo de uso: <TextInsertContainer title="Meus dados" buttonText="Enviar"/>
     */

    render(){
        return(
            <View> 
                <TitleDescComponent titleText={this.props.title} 
                    descriptionText={this.props.description} 
                    styleTitle={[styles.title, this.props.titleDescStyle]} 
                    styleView={[styles.titleView, this.props.titleDescViewStyle]}
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