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
        maxSelected: this.props.maxSelected,
        titleText: this.props.titleText,
        descriptionText:this.props.descriptionText,
        minSelected: this.props.minSelected || 0,
        minSatisfied: this.props.list.filter(x => x.isSelected).length>=(this.props.minSelected || 0 )
    };

    dataToScreen = () => {
        const selectedItems = this.state.list.filter(item => item.isSelected);
        this.props.dataToScreen(selectedItems);
    }

    _onPressAdd = (name) => {
        const cleanName = name.trim();

        // não adicionar diplicados
        const isAdded = this.state.list.map(item => item.texto).includes(name);
        const nameEmpty = cleanName.length == 0;
        if (isAdded || nameEmpty) return;

        const currentSelected = this.state.list.filter(item => item.isSelected).length;
        const maxSelected = this.state.maxSelected;
        const hasSelectionAvailable = currentSelected < maxSelected;
        
        const id = this.state.list.length + 1;
        let data = {
            id: id.toString(),
            isSelected: hasSelectionAvailable,
            texto: name
        };

        this.state.list.push(data);
        const selectedItems = this.state.list.filter(item => item.isSelected);
        this.state.minSatisfied = selectedItems.length >= this.state.minSelected;

        this.setState({ render: !this.render });
    }
    

    _onPressItem = (index) => {
        const maxSelected = this.state.maxSelected;

        // se não há limite de itens selecionados
        if (maxSelected === undefined || maxSelected === null) {
            this.state.list[index].isSelected = true;
            return;
        }

        // se puder selecionar apenas um, selecionar um item deseleciona o que estiver selecionado anteriormente
        if (maxSelected === 1) {
            this.state.list.forEach(item => item.isSelected = false);
        } else {
            // se puder selecionar vários, então só seleciona se já não tiver selecionado tudo o que podia
            const currentSelected = this.state.filter(item => item.isSelected).length;
            if (currentSelected >= maxSelected) {
                return;
            }
        }

        this.state.list[index].isSelected = true;

        const selectedItems = this.state.list.filter(item => item.isSelected);
        this.state.minSatisfied = selectedItems.length >= this.state.minSelected;

        this.setState({ render: !this.render });
    };

    
    render(){
        isDisabled = this.state.minSatisfied;
        const isEmpty = this.state.list.length === 0;
        const hasSelected = this.state.list.filter(item => item.isSelected).length !== 0;

        return (

            <View style={styles.container}>
                <TitleDescComponent styleView={styles.header}
                    titleText={this.state.titleText} 
                    descriptionText={this.state.descriptionText}
                />
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
                    { this.props.hasInput &&
                        <ItemInputListComponent
                            style={isEmpty ? {} : styles.withBorder}
                            placeholder={"Outro..."}
                            buttonText="+"
                            dataToAdd={this._onPressAdd}
                        />
                    }
                </ScrollView>
                
                <DefaultButtonComponent 
                    text={hasSelected ? "Continuar" : "Pular"}
                    action={this.dataToScreen}
                    textStyle={styles.textStyle}
                    onPress ={() => this._onPressItem(index)}
                    isDisabled = {!isDisabled}
                />
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
        marginTop: 10,
        marginBottom: 60
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
        flex: 1
    }

})