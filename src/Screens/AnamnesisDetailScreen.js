import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import RecordDetailContainer from '../Containers/RecordDetailContainer';
import { HeaderTextButtonComponent } from '../Components';

export default class AnamnesisDetailScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <HeaderTextButtonComponent
                    text='Exportar'
                    hasColor="true"
                    onPress={() => {console.warn("Funcionalidade não Implementada")}}
                />
            )
        }
    }
    render(){
        return(
            <SafeAreaView>
                <RecordDetailContainer anamnese={this.getParam("anamnesisRecord")} />
            </SafeAreaView>
        )
    }

}