import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    FlatList
} from "react-native";
import ItemListComponent from './itemListComponent';


export default class ClosedListComponent extends Component {
    
    /*
    Props:
    action
    style
    textStyle
    text

        Example:
        <ClosedListComponent 
            text={"Botão"} 
            action={this.action}
            style={styles.buttonStyle} 
            textStyle={styles.textStyle} 
        /> 
*/

    state = [
        {
            id: 1,
            isSelected: true,
            texto: "teste1"
        }, 
        {
            id: 2,
            isSelected: false,
            texto: "teste2"
        },
        {
            id: 3,
            isSelected: false,
            texto: "teste3"
        }];
    
    _onPressItem = (index) => {
        console.warn(index)
        state[index].isSelected = !state[index].isSelected;
    };

    render() {

        return (
            <FlatList style={styles.container}
                data={this.state}
                renderItem={({ item, index }) => (
              <ItemListComponent 
                text={item.texto} 
                onPress={() => this._onPressItem(index)} 
                selected={item.isSelected}
                extraData={this.state}
              />
            )}
            keyExtractor={item => item.id.toString()}
            extraData={this.state}
          />
        );
    }
}

const styles = StyleSheet.create({
    style: {
    }
})