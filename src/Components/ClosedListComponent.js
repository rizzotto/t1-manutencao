import React, {Component} from 'react';
import { FlatList } from "react-native";
import ItemListComponent from './ItemListComponent';


export default class ClosedListComponent extends Component {
    
    /*
    Props:
    maxSelected
    listItems

        Example:
        <ClosedListComponent
            maxSelected={2}
            listItems=[{
            isSelected: false,
            texto: "teste1"
        },
        {
            isSelected: true,
            texto: "teste2"
        }]
        /> 
*/

    state = {
        list: this.props.listItems
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