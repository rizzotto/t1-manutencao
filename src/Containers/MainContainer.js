/* eslint prettier/prettier: 0 */
/* eslint react/self-closing-comp: 0 */

import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import MyLabel from '../Components/MyTextComponent';
import DefaultButton from '../Components/defaultButtonComponent';
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
                <MyLabel text={"Como voce esta se sentindo hoje?"}/>
                <DefaultButton text={"Botão"}  action={this.action}></DefaultButton>
            </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
})