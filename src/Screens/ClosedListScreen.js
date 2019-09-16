import React, {Component} from 'react';
import {SafeAreaView, StyleSheet } from "react-native";
import ClosedListContainer from '../Containers/ClosedListContainer'
import ProgressBarComponent from '../Components/ProgressBarComponent';
import createDefaultNavigationOptions from './createDefaultNavigationOptions';

    /**
     * @param width Estado da barra de progresso
     * @param list Dados que estarao presentes na lista
     * @param maxSelected Numero maximo de itens que podem ser selecionados na lista 
     * @param minSelected Numero minimo de itens que devem ser selecionados na lista 
     * @param titleText Titulo da pagina 
     * @param descriptionText Descricao da pagina
     * 
     * @return Tela com barra de progresso, titulo, descricao, lista fechada e botao de ir para proxima pagina
     */
export default class ClosedListScreen extends Component {
    static navigationOptions = createDefaultNavigationOptions;

    dataFromContainer = (data) => {
        const onComplete = this.getParam("onComplete");
        if (!onComplete) return;
        onComplete(data);
    }

    selectedItems = {}
    render(){
        const width = this.getParam("width");
        const list = this.getParam("list");
        const maxSelected = this.getParam("maxSelected", 0);
        const minSelected = this.getParam("minSelected", 0);
        const titleText = this.getParam("titleText");
        const descriptionText = this.getParam("descriptionText");
        return(
            <SafeAreaView style={styles.container}>
                <ProgressBarComponent width={width}/> 
                <ClosedListContainer 
                dataToScreen={this.dataFromContainer} 
                list={list} 
                maxSelected={maxSelected} 
                minSelected={minSelected}
                titleText={titleText}
                descriptionText={descriptionText}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
