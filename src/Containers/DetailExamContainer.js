import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Dimensions,} from 'react-native';
import { Button } from '../Components';
import ImageListContainer from './ImageListContainer';
import AppStyle from '../styles';

/**
 * @author Felipe Boff, Gabriel Franzoni, Gabriel Paul
 * 
 * @param title título/nome do exame
 * @param description descrição do exame
 * @param date data da criação do exame
 * @param images imagens do exame; lista de objetos com promises ou imagens locais (ver exemplo abaixo)
 * @param onPress função chamada quando um item é clicado
 * @param style estilo aplicado ao componente
 * 
 * 
 * @return Container do Item dos Exames

*/


export default class DetailExamContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            images: props.exame.imageObjects
        }
    }


    selectedImage = (index) => {
        this.props.imageToScreen(index);
    }
    /**
     * @param {Date} date
     * @return {string}
     */
    formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    render() {
        const date = this.props.exame.creationDate;
        const images = this.state.images.map(imageObject => {
            return { imageObject }
        })

        return (

            <View style={styles.container} >

                <View style={styles.titleDateContainer}>
                    <Text style={styles.title}>{this.props.exame.name}</Text>
                </View>
                <Text style={styles.date}>{this.formatDate(date)}</Text>
                <Text style={styles.descriptionTitle}>Descrição:</Text>
                <Text style={styles.descriptionText}>{this.props.exame.description}</Text>
                <ImageListContainer
                    add={false}
                    isTouchable={true}
                    onSelectItem={this.selectedImage}
                    data={images}
                />
                <View style={styles.buttonContainer}>
                    <Button text={"Exportar"} style={styles.btnExport} textStyle={styles.btnExportText} />
                    <Button text={"Editar"} style={styles.btnEdit} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    titleDateContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        marginRight: 5,
        fontSize: 24,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        color: AppStyle.colors.darkText
    },
    container:{
        flex: 1,
        
    },
    date: {
        fontSize: 14,
        color: AppStyle.colors.darkGray
    },
    descriptionTitle: {
        marginTop: 10,
        fontSize: 16,
        color: AppStyle.colors.darkerGray
    },
    descriptionText: {
        marginBottom: 10,
        fontSize: 14,
        color: AppStyle.colors.darkGray
    },
    buttonContainer: {
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        paddingVertical:20,
        backgroundColor:AppStyle.colors.background,
    },
    btnEdit: {
        margin: 0,
        marginLeft: 20,
        width: Dimensions.get("window").width / 2 -40
    },
    btnExport: {
        margin: 0,
        marginRight: 20,
        width: Dimensions.get("window").width / 2 -40,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: AppStyle.colors.main,
    },
    btnExportText: {
        color: AppStyle.colors.main
    },
})