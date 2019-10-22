import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, ScrollView } from "react-native";
import AppStyle from '../styles';
import TitleDescComponent from '../Components/TitleDescComponent';


export default class DiaryDetailContainer extends Component {

    
    // format = (list) => {
    //     for(i = 0; list.length; i++){
    //         console.warn("DSDSA")
    //     }
    // }
    render() {
        const item = {
            creationDate: new Date(),
            comida: 12,
            humor: {
                emotion: "😡",
                text: "Raiva",
            },
            bloodPressure: "12/8",
            stressLevel: "Alto",
            symptoms: ["Desânimo", "Dores no corpo"],
            medicines: ["Diclofenaco", "ASS"]
        }
        
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
                        <Text style={styles.title}>Sintomas:</Text>
                        <Text style={styles.text}>ODISAODIJSA</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>OLA</Text>
                        <Text style={styles.text}>OLDSADSAA</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>OLA</Text>
                        <Text style={styles.text}>OLDSADSAA</Text>
                    </View>
                    <View>
                        <Text style={styles.title}> OLA</Text>
                        <Text style={styles.text}>OLDSADSAA</Text>
                    </View>
                    <View>
                        <Text style={styles.title}> OLA</Text>
                        <Text style={styles.text}>OLDSADSAA</Text>
                    </View>
                    <View>
                        <Text style={styles.title}> OLA</Text>
                        <Text style={styles.text}>OLDSADSAA</Text>
                    </View>
                    <View>
                        <Text style={styles.title}> OLA</Text>
                        <Text style={styles.text}>SAUIDHISAUHDIUSSHIUDHSAIUDHASIUDHASIUHDSAIUHDIUSAHDIUSAHDIAUSHDSAIUHDAIUHDSIUUHDIUASHDHSAIUHDUSAIHDIUAHSDIUSHAIUDHSAIUDHISAUHDIUSAHDIUSAHDIUHSAIDUHSAIUHDSAIUHDIUHSAIDHUSAIUHDSAHIU</Text>
                    </View>
                    
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        // backgroundColor: '#f33'
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
        // backgroundColor: '#d34666',
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