import React, {Component} from 'react';
import {SafeAreaView, StyleSheet } from "react-native";
import ListContainer from '../Containers/ListContainer'
import ProgressBarComponent from '../Components/ProgressBarComponent';
import CreateDefaultNavigationOptions from './CreateDefaultNavigationOptions';

    /**
     * @param hasInput Indica se a tela de lista deve ter um input para adicionar mais opcoes
     * @param width Estado da barra de progresso
     * @param list Dados que estarao presentes na lista
     * @param maxSelected Numero maximo de itens que podem ser selecionados na lista 
     * @param minSelected Numero minimo de itens que devem ser selecionados na lista 
     * @param titleText Titulo da pagina 
     * @param descriptionText Descricao da pagina
     * 
     * @return Tela com barra de progresso, titulo, descricao, lista fechada e botao de ir para proxima pagina
     */
export default class ListScreen extends Component {
    static navigationOptions = CreateDefaultNavigationOptions;

    dataFromContainer = (data) => {
        const onComplete = this.getParam("onComplete");
        if (!onComplete) return;
        onComplete(data);
    }

    selectedItems = {}
    render(){
        const hasInput = this.getParam("hasInput");
        const width = this.getParam("width");
        const list = this.getParam("list");
        const maxSelected = this.getParam("maxSelected");
        const titleText = this.getParam("titleText");
        const descriptionText = this.getParam("descriptionText");
        const minSelected = this.getParam("minSelected");
        return(
            <SafeAreaView style={styles.container}>
                <ProgressBarComponent width={width} style={styles.progressBar}/>
                <ListContainer 
                dataToScreen={this.dataFromContainer} 
                list={list} 
                maxSelected={maxSelected} 
                minSelected={minSelected}
                titleText={titleText}
                descriptionText={descriptionText}
                hasInput={hasInput}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressBar: {
        zIndex: 100
    }
})
