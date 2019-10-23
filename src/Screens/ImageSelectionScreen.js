import React, { Component } from 'react';
import { SafeAreaView, Platform, ActionSheetIOS } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import { Button } from '../Components';

// TODO: remover quando tiver o componente de imagem
import { FlatList, Image } from 'react-native';

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

    selectPhotos = () => {
        selectImages()
            .then(images => {
                // o react-native-image-crop-picker retorna um array de imagens ou uma única imagem
                // temos que normalizar se ele retornar apenas uma imagem
                if (!Array.isArray(images)) {
                    images = [images]
                }

                images.forEach(img => img.uri = img.path)
                this.setState({ ...this.state, images })

                console.warn("selecionou imagens", images)
            })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}>
                <Button text="Adicionar fotos" action={this.selectPhotos} />
                {/* TODO: remover quando o container de lista de imagens estiver pronto */}
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.images}
                    renderItem={({ item: image }) => {
                        return <Image
                            source={{url: image.path}}
                            style={{ width: 100, height: 100, margin: 10 }}
                        />
                    }}
                    extraData={this.state.images}
                    keyExtractor={(item, index) => "loc-" + index.toString()}
                />
            </SafeAreaView>
        )
    }
}

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