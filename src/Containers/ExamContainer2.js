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

export default class ExamContainer2 extends Component {

    constructor(props) {
        super(props)

        const images = props.images.slice()
        const imageCount = images.length

        // Preenche o restante da linha com vazios
        // Deve mostrar todas as imagens
        let remaining = IMAGES_PER_PAGE - (imageCount % IMAGES_PER_PAGE)
        while (remaining > 0) {
            images.push({ empty: true })
            remaining = remaining - 1
        }

        this.state = {
            images
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
        const date = this.props.date

        return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.style} activeOpacity={0.7}>
                <View style={styles.titleDateContainer}>
                    <Text numberOfLines={1} style={styles.title}>{this.props.title}</Text> 
                </View>
                <Text style={styles.date}>{this.formatDate(date)}</Text>
                <Text numberOfLines={1} style={styles.description}>{this.props.description}</Text>
                {/*Meter um TitleDescription??*/}
                
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
                                <ImageComponent imageStyle={styles.item} { ...item }>
                                    <View style={styles.darkOverlay}>
                                        <Text style={styles.darkOverlayText}>+{item.count}</Text>
                                    </View>
                                </ImageComponent>
                            )
                        } else {
                            return <ImageComponent imageStyle={styles.item} { ...item } />
                        }
                    }}
                />
            </TouchableOpacity>
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
        fontSize: 17,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        color: AppStyle.colors.darkText
    },
    date: {
        fontSize: 14,
        color: AppStyle.colors.darkGray
    },
    description: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 14,
        color: AppStyle.colors.darkGray
    },

    item: {
        flexGrow: 1,
        flexBasis: 0,
        margin: 1,
        backgroundColor: AppStyle.colors.background
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