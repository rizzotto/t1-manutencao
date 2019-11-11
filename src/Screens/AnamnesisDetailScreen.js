import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import RecordDetailContainer from '../Containers/RecordDetailContainer';
import { HeaderTextButtonComponent } from '../Components';
import { anamnesisToHtml } from '../Utils/htmlAnamnesis';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

export default class AnamnesisDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <HeaderTextButtonComponent
                    text='Exportar'
                    hasColor="true"
                    onPress={() => this.createPDF(navigation.getParam("anamnesisRecord"))}
                />
            )
        }
    }


    static createPDF = async (anamnese) => {
        const options = {
            html: anamnesisToHtml(anamnese),
            fileName: 'anamnese',
            base64: true
        };

        const file = await RNHTMLtoPDF.convert(options)
        
        const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/anamnese.pdf';
        await RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')

        await Share.open({
            url: `file://${filePath}`,
            title: "Compartilhe sua ficha",
            message: "Esta é a minha anamnese.",
        })
    }

    render() {
        return (
            <SafeAreaView>
                <RecordDetailContainer anamnese={this.getParam("anamnesisRecord")} />
            </SafeAreaView>
        )
    }
}