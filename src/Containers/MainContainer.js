/* eslint prettier/prettier: 0 */
/* eslint react/self-closing-comp: 0 */

import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import ItemListComponent from '../Components/ItemListComponent';
import ClosedListComponent from '../Components/ClosedListComponent';


export default class QuestionContainer extends Component {


    alert(){
        console.warn("sdads")
    }

    list = [
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
    ];


    render(){
        return (
            <View style={styles.container}>
                <ClosedListComponent maxSelected={2} listItems={this.list}></ClosedListComponent>
            </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
})