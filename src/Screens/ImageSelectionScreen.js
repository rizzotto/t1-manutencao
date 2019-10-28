import React, { Component } from 'react';
import { View, StyleSheet, Platform, ActionSheetIOS } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import { TitleDescription, Button, ProgressBar } from '../Components';
import { ImageSelecionContainer } from '../Containers';
import { SafeAreaView } from 'react-navigation';
import AppStyle from '../styles';

/**
 * Screen para seleção de imagens de exames.
 * 
 * Parâmetros:
 * - ...
 */
export default class ImageSelectionScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            images: []
        }
    }

    addImages = () => {
        selectImages()
            .then(newImages => {
                // o react-native-image-crop-picker retorna um array de imagens ou uma única imagem
                // temos que normalizar se ele retornar apenas uma imagem
                if (!Array.isArray(newImages)) {
                    newImages = [newImages]
                }

                // se o usuário cancelou, fazer nada
                if (newImages.length === 0) return;

                // adicionar imagens selecionadas
                const allImages = this.state.images.slice()

                console.log("add images BEFORE", newImages, allImages)

                newImages.forEach(img => {
                    allImages.push({
                        local: true,
                        path: img.path,
                        promise: Promise.resolve(img.path)
                    })
                })

                console.log("add images AFTER", newImages, allImages)

                this.setState({ ...this.state, images: allImages })
            })
    }

    continue = () => {
        console.warn("continue")
    }

    /**
     * @param {number} index
     */
    selectImage = (index) => {
        const { images } = this.state

        this.props.navigation.navigate("GalleryScreen", {
            images,
            page: index,
            showsDelete: true,
            deleteAction: this.deleteImage
        })
    }

    /**
     * @param {number} index
     */
    deleteImage = (index) => {
        const images = this.state.images.slice()
        images.splice(index, 1)
        this.setState({ ...this.state, images })
    }

    render() {
        // const { progress, title, description } = this.props
        const { images } = this.state

        console.log("rendering", this.state)

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={0.33} />
                <ImageSelecionContainer
                    title="Adicione imagens"
                    description="Você deve adicionar pelo menos uma imagem para continuar, e pode adicionar quantas imagens quiser."
                    onSelectImage={this.selectImage}
                    onAdd={this.addImages}
                    onContinue={this.continue}
                    images={images}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "stretch",
        backgroundColor: AppStyle.colors.background
    },
    titleDescription: {
        marginBottom: 30
    }
})

/**
 * Mostra ao usuário uma interface para seleção de imagens, a partir da câmera ou da galeria.
 * 
 * Mostra um alerta pedindo de onde selecionar fotos (câmera ou galeria), e depois exibe a interface adequada.
 * 
 * @returns {Promise<{ data: string, mime: string }[]>} promise que completa com uma lista com as imagens selecionadas
 */
const selectImages = () => {
    const options = {
        mediaType: "photo",
        multiple: true,
        maxSelected: 10, // setar `0` ou `-1` volta para valor padrão, que é `5`
        compressImageQuality: 0.7,
        forceJpg: true,
        loadingLabelText: "Carregando imagens...",
        waitAnimationEnd: true,
        smartAlbums: ["RecentlyAdded", "UserLibrary", "Panoramas", "Favorites", "Bursts"],
    }

    return showImageSourceAlert().then(source => {
        if (source === "gallery") {
            return ImagePicker.openPicker(options)
        } else if (source === "camera") {
            return ImagePicker.openCamera(options)
        } else {
            return Promise.resolve([])
        }
    }).catch(err => []) // ignorar erros e completar como se nenhuma imagem tivesse sido selecionada
}

/**
 * Mostra um alerta pedindo ao usuário de onde selecionar fotos.
 * 
 * No Android, mostra um alerta padrão. No iOS, mostra um action sheet.
 * 
 * @returns {Promise<"camera"|"gallery">} promise que completa quando o usuário seleciona uma origem das fotos:
 *      - `"camera"`: câmera
 *      - `"gallery"`: galeria
 */
const showImageSourceAlert = () => {
    return new Promise((resolve, reject) => {
        const complete = (index) => {
            switch (index) {
                case 0: reject("user cancelled"); break;
                case 1: resolve("camera"); break;
                case 2: resolve("gallery"); break;
                default: reject("unknown"); break;
            }
        }

        const alertTitle = "De onde você quer selecionar imagens?"

        if (Platform.OS === "ios") {
            // no ios, mostra uma sheet de baixo com as opções
            ActionSheetIOS.showActionSheetWithOptions({
                title: alertTitle,
                options: ["Cancelar", "Câmera", "Galeria"],
                cancelButtonIndex: 0
            }, complete)
        } else {
            // no android, mostra um alerta padrão
            Alert.alert(alertTitle, null, [
                { text: "Galeria", onPress: () => complete(2) },
                { text: "Cancelar", onPress: () => complete(0) },
                { text: "Câmera", onPress: () => complete(1) }
            ], {
                cancelable: true,
                onDismiss: () => complete(0)
            })
        }
    })
}