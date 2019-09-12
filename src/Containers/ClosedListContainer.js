import React, {Component} from 'react';
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import ClosedListComponent from '../Components/ClosedListComponent';
import TitleDescComponent from '../Components/TitleDescComponent';
import ProgressBarComponent from '../Components/ProgressBarComponent';
import DefaultButtonComponent from '../Components/defaultButtonComponent';


export default class ClosedListContainer extends Component {

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
            
        },
        {
            id: '4',
            isSelected: false,
            texto: "teste4"
        }, 
        {
            id: '5',
            isSelected: true,
            texto: "teste5"
        },
        {
            id: '6',
            isSelected: false,
            texto: "teste6"
            
        },
        {
            id: '4',
            isSelected: false,
            texto: "teste4"
        }, 
        {
            id: '5',
            isSelected: true,
            texto: "teste5"
        },
        {
            id: '6',
            isSelected: false,
            texto: "teste6"
            
        },
        {
            id: '4',
            isSelected: false,
            texto: "teste4"
        }, 
        {
            id: '5',
            isSelected: true,
            texto: "teste5"
        },
        {
            id: '190',
            isSelected: false,
            texto: "190"
            
        }, 
        {
            id: '5',
            isSelected: true,
            texto: "teste5"
        },
        {
            id: '6',
            isSelected: false,
            texto: "teste6"
            
        },
        {
            id: '4',
            isSelected: false,
            texto: "teste4"
        }, 
        {
            id: '5',
            isSelected: true,
            texto: "teste5"
        },
        {
            id: '190',
            isSelected: false,
            texto: "190"
            
        }
    ];


    render(){
        
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ProgressBarComponent width={0.5}/>
                    <TitleDescComponent 
                        titleText={"Medicamentos"} 
                        descriptionText={"Informe os medicamentos que que você usa atualmente"}
                    />
                </View> 
                <ScrollView style={styles.content}>
                    <ClosedListComponent maxSelected={2} listItems={this.list}/>
                </ScrollView>
                <View style={styles.bottom}>
                    <DefaultButtonComponent 
                    text={"Próximo"} 
                    action={this.action}
                    disabled={true}
                    style={styles.buttonStyle} 
                    textStyle={styles.textStyle}
                    />     
                </View> 
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: '#3d3d',
    },
    header: {
    },
    content: {
        marginTop:'15%',
        marginBottom:'3%',
    },
    bottom: {
        marginBottom:'10%',
        alignContent:'flex-end'
    },

})