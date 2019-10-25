import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import AppStyle from '../styles';

/**
 * @author Gabriel Franzoni, João Leão
 * 
 * @param
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <ExamItemContainer></ExamItemContainer>
 * @return Container do Item dos Exames
 */

export default class ExamItemContainer extends Component {
    defaultAction = () => {
        console.log("Funcionalidade não implementada");
    }
    state = {
        // O data precisa ser futuramente substituido por callbacks
        data: [
            { id: 0, src: require("../Resources/00.jpg") },
            { id: 1, src: require("../Resources/01.jpeg") },
            { id: 2, src: require("../Resources/02.jpg") },
            { id: 3, src: require("../Resources/03.jpg") },
            { id: 4, src: require("../Resources/03.jpg") },
            { id: 5, src: require("../Resources/03.jpg") },
            { id: 6, src: require("../Resources/03.jpg") },
            { id: 7, src: require("../Resources/03.jpg") },
        ]
    };
    render(){
        return(
            <TouchableOpacity style = {styles.container} onPress={this.defaultAction}>
                <View style={styles.nameDate}>
                    <Text style={styles.name}>Dr. Carlos</Text>
                    <Text style={styles.date}> 26/05/2007</Text>
                </View >
                    <Text numberOfLines={1} style={styles.description}>Exame de sangue, cardiograma, hemograma, mais textos</Text>
                
                <FlatList
                    style={styles.list}
                    numColumns={3}
                    initialNumToRender={5}
                    data={this.state.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.item}>
                                {this.state.data.length<=6? <Image style = {styles.image} source={this.state.data[item.id].src}/>: null}
                                {this.state.data.length>6 && item.id==5? <Text style={styles.more}>•••</Text>: null}
                                {this.state.data.length>6 && item.id<5? <Image style = {styles.image} source={this.state.data[item.id].src}/>: null}
                            </View>
                        );   
                    }}
                />
            </TouchableOpacity>
        )
        
    }
}

const styles = StyleSheet.create({
    name: {
        fontWeight: "bold",
        fontSize: 20,
        flex: 1
    },
    date: {
        color: AppStyle.colors.mediumGray,
        fontSize: 17,
        textAlignVertical: "center"
    },
    description: {
        color: AppStyle.colors.mediumGray,
        fontSize: 15,
        marginBottom: "5%",
        marginTop: "2%"
    },
    nameDate: {
        flexDirection: "row",
    },
    container: {
        marginHorizontal: "5%",
        
    },
    
    item: {
        flexBasis: 0,
        alignItems: "center",
        flexGrow: 1,
        margin: 5,
        backgroundColor: AppStyle.colors.lightGray,
        
    },
    image:{
        width: "100%",
        height: 125
    },
    more:{
        textAlign: "center",
        textAlignVertical: "center",
        flex: 1,
        fontSize: 50,
        color: AppStyle.colors.darkGray,
    }
})