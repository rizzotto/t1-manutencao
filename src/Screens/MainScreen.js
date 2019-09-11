import React, {Component} from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import MainContainer from '../Containers/MainContainer'

export default class QuestionScreen extends Component {

    static navigationOptions = {
        title: 'Sua Ficha',
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <MainContainer></MainContainer>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    }
})