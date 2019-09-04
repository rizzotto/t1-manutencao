import React, {Component} from 'react';
import {Text, StyleSheet, View } from "react-native";
export default class detailedRecordComponent extends Component {
    /*
     Props:
     styleView
     titleText
     createdAt
     emailText
     birthDate
     weightText
     heightText
    
        Example:
        <DetailedRecordComponent
            titleText={"Cassandra Valentina Gomes"} 
            createdAt={"16/08/2019"}
            emailText={"cassandra.gomes@gmail.com"}
            birthDate={"20/08/1990"}
            weightText={"65 kg"}
            heightText={"170 cm"}
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
                        this.props.createdAt && 

                        <Text style={styles.founded}>
                            Ficha criada em:{this.props.createdAt}
                        </Text>

                    }
                    <Text style={styles.label}>E-mail:</Text>
                    {
                        this.props.emailText && 
                        
                        <Text style={styles.content}>
                            {this.props.emailText}
                        </Text>

                    }

                    <Text style={styles.label}>Data de Nascimento:</Text>
                    {
                        this.props.birthDate && 
                        
                        <Text style={styles.content}>
                            {this.props.birthDate}
                        </Text>

                    }
                    <Text style={styles.label}>Peso e Altura:</Text>
                    {
                        this.props.weightText && 
                        this.props.heightText &&
                        
                        <Text style={styles.content}>
                            {this.props.weightText}, {this.props.heightText}
                        </Text>

                    }   

                    <View style={styles.hr}/>
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
    