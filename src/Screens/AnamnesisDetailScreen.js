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
        const onExport = () => {
            const operation = this.createPDF(navigation.getParam("anamnesisRecord")).then(() => {
                this.sharePDF().then(() => navigation.navigate("Main"));
                
            })

            navigation.push("Loading", {operation})
        }
        return {
            headerRight: (
                <HeaderTextButtonComponent
                    text='Exportar'
                    hasColor="true"
                    onPress={onExport}
                />
            )
        }
    }


    /**
     * Função que cria um PDF utilizando uma dependência que gera o mesmo a partir de um HTML, 
     * o qual é gerado a partir de uma função chadama anamnesisToHtml. Após o PDF ser criado, ele é escrito na memória do dispositivo, 
     * e por fim uma tela é aberta para compartilhar o mesmo, através de diferentes meios.
     * @param {Object} anamnese que corresponde a última ficha de anamnese.
     */
    static createPDF = async (anamnese) => {
        const options = {
            html: anamnesisToHtml(anamnese),
            fileName: 'anamnesePDF',
            base64: true
        };

        const file = await RNHTMLtoPDF.convert(options)

        const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/anamnesePDF.pdf';
        await RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')

    }

    static sharePDF = async () => {
        const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/anamnesePDF.pdf';
        try {
            await Share.open({
                url: `file://${filePath}`,
                title: "Compartilhe sua ficha",
                message: "Esta é a minha anamnese.",
            })
        } catch (error) {
            // usuário cancelou
        }
    }

    render() {

        return (
            <SafeAreaView>
                <RecordDetailContainer anamnese={this.getParam("anamnesisRecord")} />
            </SafeAreaView>
        )
    }
}