import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import FastImage from 'react-native-fast-image';

/**
 * Tela de visualização de múltiplas imagens.
 * 
 * Parâmetros:
 * - `images`: lista com imagens a serem exibidas
 * - `page`: índice da imagem que é inicialmente exibida
 * - `showsDelete`: indica se o botão de excluir deve ser exibido no header da screen
 * - `deleteAction`: função chamada quando o botão "Excluir" é tocad; recebe como parâmetro o índica da imagem que estava exibida quando o botão foi tocado
 */
export default class GalleryScreen extends Component {

    constructor(props) {
        super(props)

        const images = this.getParam("images", [])
        this.state = {
            images,
            totalPages: images.length,
            currentPage: this.getParam("page", 0)
        }
    }

    /**
     * Função chamada quando uma imagem é exibida.
     * @param {number} index índice da imagem exibida
     */
    onShowImage = (index) => {
        // atualizar o header
        this.setState({ ...this.state, currentPage: index })
    }

    /**
     * Função chamada quando o botão "Excluir" é tocado.
     */
    delete = () => {
        // invocar handler passado via props
        const deleteAction = this.getParam("deleteAction")
        if (!deleteAction) return;
        deleteAction(this.state.currentPage)

        // dar dismiss na tela
        this.props.navigation.goBack()
    }

    /**
     * Função chamada quando o botão "Fechar" é tocado.
     */
    close = () => {
        // dar dismiss na tela
        this.props.navigation.goBack()
    }

    render() {
        const { images, currentPage, totalPages } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <View style={styles.header}>
                    <View style={styles.headerLeftRightContainer}>
                        { this.getParam("showsDelete", false) &&
                            <TouchableOpacity onPress={this.delete}>
                                <Text style={styles.headerLeft}>Excluir</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.headerCenterContainer}>
                        <Text style={styles.headerCenter}>{currentPage + 1} de {totalPages}</Text>
                    </View>
                    <View style={styles.headerLeftRightContainer}>
                        <TouchableOpacity onPress={this.close}>
                            <Text style={styles.headerRight}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <GallerySwiper style={styles.swiper}
                    imageComponent={(props) => <FastImage { ...props } />}
                    images={images}
                    initialPage={currentPage}
                    sensitiveScroll={false}
                    onPageSelected={this.onShowImage}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 16
    },

    headerLeftRightContainer: {
        flex: 1
    },
    headerCenterContainer: {
        flex: 2
    },

    headerLeft: {
        fontSize: 17,
        color: "#fff"
    },
    headerRight: {
        fontSize: 17,
        color: "#fff",
        textAlign: "right"
    },
    headerCenter: {
        fontSize: 17,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        textAlign: "center",
        color: "#fff"
    },

    swiper: {
        flex: 1
    }
})
