/* eslint prettier/prettier: 0 */
/* eslint react/self-closing-comp: 0 */

import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import MyLabel from '../Components/MyTextComponent';
import DefaultButton from '../Components/defaultButtonComponent';


export default class QuestionContainer extends Component {

    alert(){
        console.warn("sdads")
    }

    render(){
        
        return (
            <View style={styles.container}>
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