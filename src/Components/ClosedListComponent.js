import React, {Component} from 'react';
import { FlatList } from "react-native";
import ItemListComponent from './ItemListComponent';


export default class ClosedListComponent extends Component {
    
    /*
    Props:
    maxSelected

        Example:
        <ClosedListComponent
            maxSelected={2}
        /> 
*/

    state = {
        list: [
            {
                id: '1',
                isSelected: false,
                texto: "teste1"
            }, 
            {
                id: '2',
                isSelected: true,
                texto: "teste2"
            },
            {
                id: '3',
                isSelected: false,
                texto: "teste3"
                
            }
        ]
    };

    maxSelected = this.props.maxSelected;

    _onPressItem = (index) => {
        let numbSelected = this.state.list.filter(x => x.isSelected).length;
        if (numbSelected < this.maxSelected || this.state.list[index].isSelected) {
            this.state.list[index].isSelected = !this.state.list[index].isSelected;
            this.setState({ refresh: !this.state.refresh })
        }
    };

    render() {

        return (
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
          />
        );
    }
}