import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import TitleDescComponent from '../Components/TitleDescComponent';
import DefaultButtonComponent from '../Components/defaultButtonComponent';
import ItemListComponent from '../Components/ItemListComponent';
import AppStyle from '../styles';
/**
     * @param dataToScreen Dados que serao rertornados para Screen (lista com itens selecionados)
     * @param list Dados que estarao presentes na lista
     * @param maxSelected Numero maximo de itens que podem ser selecionados na lista 
     * @param titleText Titulo da pagina 
     * @param descriptionText Descricao da pagina
     * @param required Indicacao de se é necessario selecionar itens na lista 
     * @return Container com titulo, descricao, lista fechada e botao de ir para proxima pagina
     */

export default class ClosedListContainer extends Component {
    
    state = {
        list: this.props.list,
        maxSelected: this.props.maxSelected,
    };
    
    selectedItems = this.props.list.filter(x => x.isSelected)

    _onPressItem = (index) => {
        this.setState({ render: !this.render })
        
        let numbSelected = this.state.list.filter(x => x.isSelected).length;
        
        if (numbSelected < this.state.maxSelected || this.state.list[index].isSelected) {
            this.state.list[index].isSelected = !this.state.list[index].isSelected;
            this.setState({ refresh: !this.state.refresh })
        }
        this.selectedItems = this.state.list.filter(x => x.isSelected)
    };

    dataToScreen = () => {
        this.props.dataToScreen(this.selectedItems);
    }
    
    render(){
        selectedItems = this.selectedItems;
        console.warn(this.minIsStaisfied)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TitleDescComponent 
                        titleText={this.props.titleText} 
                        descriptionText={this.props.descriptionText}
                    />
                </View> 
                <ScrollView style={styles.content}>
                    <FlatList
                        data={this.state.list}
                        renderItem={({ item, index }) => (
                            <ItemListComponent 
                                text={item.texto}
                                onPress ={() => this._onPressItem(index)} 
                                selected={item.isSelected}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        extraData={this.state.refresh}
                        ItemSeparatorComponent={() => <Separator />}
                    />
                </ScrollView>
                
                <View style={styles.bottom}>
                    <DefaultButtonComponent 
                        text={selectedItems.length==0? "Pular": "Próximo"}
                        action={this.dataToScreen}
                        style={styles.buttonStyle} 
                        textStyle={styles.textStyle}
                        extraData={this.state.refresh}
                        onPress ={() => this._onPressItem(index)}
                    />     
                </View> 
            </View>
        )
    }
}

const Separator = () => <View style={styles.line} />

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
    },
    content: {
        marginTop:'15%',
        marginBottom:'3%',
    },
    bottom: {
        marginBottom:'10%',
        alignContent:'flex-end'
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: AppStyle.colors.lightGray
    }
})