import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button, TitleDescription } from '../Components';
import AppStyle from '../styles';
/**
 * @param local nome da tela em que o container será colocado. Pode ser: 'exames', 'diario' ou 'fichas'
 * @param buttonAction ação do botão
 *  - Example:
 *    <EmptyStateContainer 
 *          local={'fichas'} 
 *          buttonAction={this._newRecord}
 *    />
 */

export default class EmptyStateContainer extends Component {
    render() {
        buttonAction = this.props.buttonAction
        if (this.props.local === 'diario') {
            title = 'Acompanhe seu\ndia-a-dia'
            description = 'Com o HiperBem, você consegue\nacompanhar seu humor, medicação e\nsintomas diariamente.'
            buttonTitle = 'Adicionar ao diário'
        }
        else if (this.props.local === 'exames') {
            title = 'Você no controle dos seus exames'
            description = 'Com o HiperBem, você consegue centralizar os resultados dos seus exames médicos, poupando tempo e dinheiro!'
            buttonTitle = 'Adicionar exames'
        }
        else if (this.props.local === 'fichas') {
            title = 'Seus dados clínicos sempre com você'
            description = 'Com o HiperBem, você consegue centralizar suas informações clínicas e poupar tempo em consultas médicas.'
            buttonTitle = 'Adicionar ficha'
        }
        return (
            <View style={styles.container}>

                <Image 
                style={{width: 100, height: 100, alignSelf:'center'}} 
                source={require('../Resources/emptyState.png')} />
                <TitleDescription 
                styleView={styles.titleDescView}
                styleTitle={styles.title}
                styleDescription={styles.description}
                titleText={title} descriptionText={description} />
                <Button text={buttonTitle} action={buttonAction} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "stretch",
        justifyContent:'center',
        backgroundColor: AppStyle.colors.background,
    },
    titleDescView: {
        marginTop: 25,
        marginBottom: 10,
        textAlign:'center'
    },
    text:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        marginTop:0,
        marginBottom:10,
        textAlign:'center',
    },
    description:{
        textAlign:'center',
    }


});
