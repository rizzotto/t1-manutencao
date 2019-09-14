import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import TitleDescComponent from '../Components/TitleDescComponent';
import DefaultButtonComponent from '../Components/defaultButtonComponent';
import ItemListComponent from '../Components/ItemListComponent';
import AppStyle from '../styles';
/**
     * @param dataToScreen Dados que serao rertornados para Screen (lista com itens selecionados)
     * @param minSelected Numero minimo de itens que devem ser selecionados na lista 
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
        maxSelected: this.props.maxSelected || this.props.list.length,
        titleText: this.props.titleText,
        descriptionText:this.props.descriptionTextm,
        minSelected: this.props.minSelected || 0,
        selectedItems: this.props.list.filter(x => x.isSelected),
        minSatisfied: this.props.list.filter(x => x.isSelected).length>=(this.props.minSelected || 0 )
    };
    dataToScreen = () => {
        this.props.dataToScreen(this.state.selectedItems);
    }
    

    _onPressItem = (index) => {
        this.setState({ render: !this.render })
        
        let numbSelected = this.state.list.filter(x => x.isSelected).length;
        
        if (numbSelected < this.state.maxSelected || this.state.list[index].isSelected) {
            this.state.list[index].isSelected = !this.state.list[index].isSelected;
        }
        this.state.selectedItems = this.state.list.filter(x => x.isSelected)
        this.state.minSatisfied = this.state.selectedItems.length>=this.state.minSelected;
    };

    
    render(){
        isDisabled = this.state.minSatisfied;
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <TitleDescComponent 
                        titleText={this.state.titleText} 
                        descriptionText={this.state.descriptionText}
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
                        text={this.state.selectedItems.length==0? "Pular": "Próximo"}
                        action={this.dataToScreen}
                        style={styles.buttonStyle} 
                        textStyle={styles.textStyle}
                        extraData={this.state.refresh}
                        onPress ={() => this._onPressItem(index)}
                        isDisabled = {!isDisabled}
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