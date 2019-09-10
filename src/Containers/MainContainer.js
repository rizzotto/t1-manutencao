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


    render(){
        return (
            <View style={styles.container}>
                <ClosedListComponent maxSelected={2}></ClosedListComponent>
            </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
})