import React, {Component} from 'react';
import {Text, StyleSheet, View } from "react-native";
export default class detailedRecordComponent extends Component {
    /*
     Props:
     styleView
     styleTitle
     styleDescription
     titleText
     descriptionText
     
        Example:
        <DetailedRecordComponent
            titleText={"Peso:"} 
            desciptionText={"57 kg"}
        /> 
    */
        render(){
            return (
                <View style={this.props.styleView}>
                    {
                        this.props.titleText &&
    
                        <Text style={[styles.label, this.props.styleTitle]} >
                            {this.props.titleText}
                        </Text>
                    }
                    {
                        this.props.descriptionText &&

                         <Text style={[styles.content,this.props.styleDescription]}>
                         {this.props.descriptionText}
                         </Text>
                    }
                </View>
            )
        }
    }

    const styles = StyleSheet.create({
        label: {
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 8,
            marginRight: 8
        },
        content: {
            fontSize: 15,
            marginLeft: 8,
            marginRight: 8
        }
    }) 
    