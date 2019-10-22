import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, ScrollView } from "react-native";
import AppStyle from '../styles';
import DefaultButtonComponent from '../Components/DefaultButtonComponent';



export default class DiaryDetailContainer extends Component {
    
    format = (list) => {
        let array = ''
        for (var i = 0; i < list.length; i++) {
            if(i===list.length-1) array = array + list[i] + '.'
            else array = array + list[i] + ', '
         }
         return array
    }

    render() {
        const item = this.props.item
        const action = this.props.action
        return (
            <View style={styles.main}>

                <View style={styles.emojiView}>
                    <Text style={styles.emojiImage}>{item.humor.emotion}</Text>
                    <Text style={styles.emojiText}>{item.humor.text}</Text>
                </View>

                <ScrollView style={styles.info}>
                    <Text style={styles.date}>{'Horário: ' + item.creationDate.getHours() + 'h' + item.creationDate.getMinutes() + 'min'}</Text>
                    <View>
                        <Text style={styles.title}>Pressão:</Text>
                        <Text style={styles.text}>{item.bloodPressure + ' mmHg.'} </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Nível de Estresse:</Text>
                        <Text style={styles.text}>{item.stressLevel + '.'}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Sintomas:</Text>
                        {item.symptoms.length===0 ? <Text style={styles.text}>Nenhum.</Text> : <Text style={styles.text}>{this.format(item.symptoms)}</Text> }
                    </View>
                    <View>
                        <Text style={styles.title}>Medicamentos:</Text>
                        {item.medicines.length===0 ? <Text style={styles.text}>Nenhum.</Text> : <Text style={styles.text}>{this.format(item.medicines)}</Text> }
                    </View>
                </ScrollView>
                <DefaultButtonComponent text={"Editar"} action={this.test()}></DefaultButtonComponent>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
    },
    emojiView:{
        alignItems: 'center',
        alignContent: 'center'
    },
    emojiImage:{
        fontSize: 70,
        marginTop: '5%' 
    },
    emojiText:{
        fontSize: 25,
        marginTop: '1%',
        fontWeight: 'bold'
    },
    date: {
        fontSize: 20,
        color: AppStyle.colors.mediumGray,
    },
    info: {
        margin: '5%',
        // backgroundColor: '#4ff'
    },
    title:{
        // backgroundColor: '#e3e',
        marginTop: '7%',
        fontWeight: 'bold',
        fontSize: 18
    },
    text:{
        marginTop: '3%',
        fontSize: 16
    },


})