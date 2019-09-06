import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import MyLabel from '../Components/myTextComponent'
import ItemListComponent from '../Components/itemListComponent'


export default class QuestionContainer extends Component {


    alert(){
        console.warn("sdads")
    }


    render(){
        return (
            <View style={styles.container}>
                <ItemListComponent onPress={this.alert} text={"Teste"}></ItemListComponent>
            </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
})