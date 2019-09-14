import React, {Component} from 'react';
import {SafeAreaView, StyleSheet } from "react-native";
import ClosedListContainer from '../Containers/ClosedListContainer'
import ProgressBarComponent from '../Components/ProgressBarComponent';
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
        console.warn(data);
    }

    selectedItems = {}
    render(){
        const width = this.props.width || this.props.navigation.getParam("width");
        const list = this.props.list || this.props.navigation.getParam("list");
        const maxSelected = this.props.maxSelected || this.props.navigation.getParam("maxSelected");
        const titleText = this.props.titleText || this.props.navigation.getParam("titleText");
        const descriptionText = this.props.descriptionText || this.props.navigation.getParam("descriptionText");
        const minSelected = this.props.minSelected || this.props.navigation.getParam("minSelected");
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
