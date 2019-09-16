import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import TitleDescComponent from '../Components/TitleDescComponent';
import DefaultButtonComponent from '../Components/defaultButtonComponent';
import ItemListComponent from '../Components/ItemListComponent';
import ItemInputListComponent from '../Components/ItemInputListComponent';
import AppStyle from '../styles';
/**
     * @param hasInput Indica se a tela de lista deve ter um input
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
        descriptionText:this.props.descriptionText,
        minSelected: this.props.minSelected || 0,
        selectedItems: this.props.list.filter(x => x.isSelected),
        minSatisfied: this.props.list.filter(x => x.isSelected).length>=(this.props.minSelected || 0 )
    };
    dataToScreen = () => {
        this.props.dataToScreen(this.state.selectedItems);
    }

    _onPressAdd = (name) => {
        isAdded = this.state.list.filter((item)=>{ 
            return name == item.texto
        }).length >0
        nameEmpty = name.length==0
        // console.warn(nameEmpty + "")
        if (isAdded | nameEmpty) return ;

        
        id = this.state.list.length+1;
        let data = {
            id: "" +id,
            isSelected: false,
            texto: name
        };

        this.state.list = [data].concat(this.state.list);
        this.state.selectedItems = this.state.list.filter(x => x.isSelected);
        this.setState({ render: !this.render });
        this.state.minSatisfied = this.state.selectedItems.length>=this.state.minSelected;
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
                <View style={styles.content}>
                <ScrollView  >
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
                            {this.props.hasInput? <ItemInputListComponent
                                    
                                    style={this.state.list.length==0? styles.noBorder: styles.withBorder}
                                    placeholder={"Outro..."}
                                    buttonText={"Adicionar"} 
                                    dataToAdd={this._onPressAdd}
                                /> : <View/>}
                </View>

                
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
        marginBottom:'5%',
    },
    bottom: {
        marginBottom:'10%',
        marginTop:'8%',
        alignContent:'flex-end',
        position: "absolute",
        bottom: 0
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: AppStyle.colors.lightGray
    },
    withBorder: {
        borderColor: AppStyle.colors.lightGray,
        borderTopWidth: 1
    },
    content: {
        maxHeight: "63%"
    }

})