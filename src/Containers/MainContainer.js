import React, {Component} from 'react';
import { View, TextInput } from "react-native";
import MyLabel from '../Components/myTextComponent';
import DefaultButton from '../Components/defaultButtonComponent';
import DetailedRecordComponent from '../Components/detailedRecordComponent';


export default class QuestionContainer extends Component {

    render(){
        
        return (
            <View style={{alignItems:"center"}}>
                <DetailedRecordComponent
                    titleText={"Peso: "} 
                    descriptionText={"56 kg"}
                    createdAt={"16/08/2019"}
                    emailText={"cassandra.gomes@gmail.com"}
                    birthDate={"20/08/1990"}
                    weightText={"65 kg"}
                    heightText={"170 cm"}
                /> 
            </View>
        )
    }
}