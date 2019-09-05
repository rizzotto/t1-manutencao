import React, {Component} from 'react';
import {Text, StyleSheet, View } from "react-native";
export default class detailedRecordComponent extends Component {
    /*
     Props:
     styleView
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

                         <Text style={[this.props.style,this.props.styleTitle]}>
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
        },
        founded: {
            fontSize: 15,
            color: 'gray',
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 5
        },
        hr: {
            marginTop: 7,
            borderBottomColor: 'gainsboro',
            borderBottomWidth: 2
        }
    }) 
    