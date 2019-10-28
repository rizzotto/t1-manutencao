import React, {Component} from 'react';
import {SafeAreaView, StyleSheet } from "react-native";
import { ExamsListContainer } from '../Containers/ExamsListContainer';

export default class ListExamsScreen extends Component {
    
    render() {
        // const data = this.getParam("data");
        const data = [
                         {
                             title: "Dr. Carlos",
                             description: "Exame de sangue, cardiograma, hemograma, mais texto",
                             date: new Date("2019-10-10"),
                             images: [{ promise: Promise.value("...url") }, { sourceImage: require("...path") }]
                         }
                     ]
        return(
            <SafeAreaView>
                <ExamsListContainer data={data}>
                </ExamsListContainer>               
            </SafeAreaView>
        );
    }
}