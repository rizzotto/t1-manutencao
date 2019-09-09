/* eslint prettier/prettier: 0 */
/* eslint react/self-closing-comp: 0 */

import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import ItemListComponent from '../Components/itemListComponent';
import ClosedListComponent from '../Components/closedListComponent';


export default class QuestionContainer extends Component {


    alert(){
        console.warn("sdads")
    }


    render(){
        return (
            <View style={styles.container}>
                <ItemListComponent onPress={this.alert} text={"Teste"} selected={true}></ItemListComponent>
            </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
})