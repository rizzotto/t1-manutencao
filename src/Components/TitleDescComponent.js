import React, {Component} from 'react';
import {Text, StyleSheet, View } from "react-native";

export default class titleDescComponent extends Component {
/*
 Props:
 styleView
 styleTitle
 styleDescription
 titleText
 descriptionText

    Example:
    <TitleDescComponent 
        styleTitle={styles.title} 
        styleDescription={styles.description}
        titleText={"Medicação"} 
        descriptionText={"Insira sua medicação aqui"}
    /> 
*/
    render(){
        return (
            <View style={this.props.styleView}>

                {
                    this.props.titleText &&

                    <Text style={[styles.title, this.props.styleTitle]} >
                        {this.props.titleText}
                    </Text>
                }

                {
                    

                    this.props.descriptionText &&  
                    
                    <Text style={[styles.description, this.props.styleDescription]} >
                        {this.props.descriptionText}
                    </Text> 
                }
   
            </View>
        )
    }
}



const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginLeft: 8,
        marginRight: 8
    },
    description: {
        fontSize: 15,
        color: '#BFBFBF',
        marginLeft: 8,
        marginRight: 8
    }
}) 

