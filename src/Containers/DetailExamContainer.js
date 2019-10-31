import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { ImageComponent } from '../Components';
import AppStyle from '../styles';

// imagens exibidas por linha
const IMAGES_PER_PAGE = 3

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
 * Exemplo de uso:
 * 
 * ```
 *      <ExamContainer2
 *          title="Dr. Carlos"
 *          description="Exame de sangue, cardiograma, hemograma, mais texto"
 *          date={new Date("2019-10-10")}
 *          images={[{ promise: Promise.value("...url") }, { sourceImage: require("...path") }]}
 *      />
 * ```
 * 
 * @return Container do Item dos Exames
 */



 /*
    TODO
    Passar os dados corretamente
    Mostrar as imagens recebidas 
    Ao clicar abrir a imagem em FU screen
    Ao clicar em editar, navegar para o fluxo de edição

 */
export default class DetailExamContainer extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            images: props.exame.images
        }
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

        return (
            <View style={this.props.style}>
                <View style={styles.titleDateContainer}>
                    <Text style={styles.title}>Dr. Carlos</Text> 
                </View>
                <Text style={styles.date}>{this.formatDate(date)}</Text>
                <Text style={styles.descriptionTitle}>Descrição:</Text>
                <Text style={styles.descriptionText}>{this.props.exame.description}</Text>
                
                <FlatList
                    numColumns={IMAGES_PER_PAGE}
                    data={this.state.images}
                    listKey={() => `exam#${date.getTime()}#list`}
                    keyExtractor={(item, index) => `exam#${date.getTime()}image#${index}#key`}
                    renderItem={({ item }) => {
                        if (item.empty) {
                            return <View style={styles.item} />
                        } else if (item.multiple) {
                            return (
                                <ImageComponent imageStyle={styles.item} { ...item } isTouch={true}>
                                    <View style={styles.darkOverlay}>
                                        <Text style={styles.darkOverlayText}>+{item.count}</Text>
                                    </View>
                                </ImageComponent>
                            )
                        } else {
                            return <ImageComponent imageStyle={styles.item} { ...item } isTouch={true}/>
                        }
                    }}
                />
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
        flex: 1,
        marginRight: 5,
        fontSize: 24,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        color: AppStyle.colors.darkText
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

    item: {
        flexGrow: 1,
        flexBasis: 0,
        margin: 1,
        backgroundColor: "#000"
    },

    darkOverlay: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    darkOverlayText: {
        fontSize: 20,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        color: AppStyle.colors.lightText
    }
})