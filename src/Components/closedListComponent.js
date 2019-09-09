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
    
    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(1, !selected.get(1)); // toggle
            return {selected};
        });
    };

    render() {

        return (
            <FlatList style={styles.container}
                data={this.state}
                renderItem={({ item }) => (
              <ItemListComponent 
                text={item.texto} 
                // onPress={this._onPressItem} 
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