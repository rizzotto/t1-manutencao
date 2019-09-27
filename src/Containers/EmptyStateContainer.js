import React, {Component} from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button, TitleDescription } from '../Components';
import AppStyle from '../styles';

export default class EmptyStateContainer extends Component {
    render() {
        buttonAction=this.props.buttonAction
        if(this.props.local==='diario'){
            title='Acompanhe seu dia-a-dia'
            description='Com o HiperBem, você consegue acompanhar seu humor, medicação e sintomas diariamente.'
            buttonTitle='Adicionar ao diário'
        }
        else if(this.props.local==='exames'){
            title='Você no controle dos seus exames'
            description='Com o HiperBem, você consegue centralizar os resultados dos seus exames médicos, poupando tempo e dinheiro!'
            buttonTitle='Adicionar exames'
        }
        else if(this.props.local==='fichas'){
            title='Seus dados clínicos sempre com você'
            description='Com o HiperBem, você consegue centralizar suas informações clínicas e poupar tempo em consultas médicas.'
            buttonTitle='Adicionar ficha'
        }
        return (
            <View>
                <Image source={require('../Resources/emptyState.png')}/>
                <TitleDescription titleText={title} descriptionText={description}/>
                <Button text={buttonTitle} action={buttonAction}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        backgroundColor: AppStyle.colors.background,
    },
    enter: {
        justifyContent: "center",
        alignItems: "center",
        width: "10%"

    },
});
