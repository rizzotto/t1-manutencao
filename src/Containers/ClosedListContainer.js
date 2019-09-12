/* eslint prettier/prettier: 0 */
/* eslint react/self-closing-comp: 0 */

import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import ClosedListComponent from '../Components/ClosedListComponent';
import TitleDescComponent from '../Components/TitleDescComponent';
import ProgressBarComponent from '../Components/ProgressBarComponent';


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
                {/* <View style={styles.test}> */}
                    <ProgressBarComponent width={0.5}/>
                {/* </View> */}
                <TitleDescComponent 
                    titleText={"Medicamentos"} 
                    descriptionText={"Informe os medicamentos que que você usa atualmente"}
                /> 
                <ClosedListComponent maxSelected={2} listItems={this.list}></ClosedListComponent>
            </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
    //   alignItems: 'center',
  },
  test: {
      backgroundColor: '#3d3d'
  }
})