import React, {Component} from 'react';
import { View, TextInput } from "react-native";
import MyLabel from '../Components/myTextComponent'


export default class QuestionContainer extends Component {


    render(){
        return (
            <View style={{alignItems:"center"}}>
                <MyLabel text={"Como voce esta se sentindo hoje?"}/>
            </View>
        )
    }
}