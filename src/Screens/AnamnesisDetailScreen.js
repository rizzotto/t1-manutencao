import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import RecordDetailContainer from '../Containers/RecordDetailContainer';

export default class AnamnesisDetailScreen extends Component{

    render(){
        return(
            <SafeAreaView>
                <RecordDetailContainer anamnese={this.getParam("anamnesisRecord")} />
            </SafeAreaView>
        )
    }

}