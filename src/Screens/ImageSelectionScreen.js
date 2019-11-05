import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Platform, ActionSheetIOS, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import ImagePicker from "react-native-image-crop-picker";
import { ProgressBar } from '../Components';
import { ImageSelecionContainer } from '../Containers';
import AppStyle from '../styles';
import CreateDefaultNavigationOptions from './CreateDefaultNavigationOptions';

/**
 * Screen para seleção de imagens de exames.
 * 
 * Parâmetros:
 * - `progress`: porcentagem da barra de progresso
 * - `title`: título da tela
 * - `description`: descrição da tela
 * - `images`: imagens inicialmente exibidas pela tela; pega apenas o valor inicial, não atualiza quando `props` for atualizado
 * - `onComplete`: função chamada quando o usuário toca no botão "Continuar", com as imagens selecionadas
 * 
 * NOTA: essa screen depende do react-navigation, portanto a classe não é exportada na definição
 * (ver `export default` abaixo da definição da classe).
 */
class ImageSelectionScreen extends Component {
    static navigationOptions = CreateDefaultNavigationOptions;

    constructor(props) {
        super(props)

        this.state = {
            images: this.getParam("images", [])
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

                // adicionar imagens selecionadas (todas são locais)
                const allImages = this.state.images.slice()
                newImages.forEach(img => {
                    allImages.push({
                        type: "local",
                        mime: img.mime,
                        uri: img.path
                    })
                })

                this.setState({ ...this.state, images: allImages })
            })
    }

    continue = () => {
        const onComplete = this.getParam("onComplete")
        if (!onComplete) return;
        onComplete(this.state.images)
    }

    /**
     * @param {number} index
     */
    selectImage = (index) => {
        const { images } = this.state

        this.props.navigation.navigate("Gallery", {
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
        const progress = this.getParam("progress", 0)
        const title = this.getParam("title", "")
        const description = this.getParam("description", "")
        const { images } = this.state

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress} />
                <ImageSelecionContainer
                    title={title}
                    description={description}
                    onSelectImage={this.selectImage}
                    onAdd={this.addImages}
                    onComplete={this.continue}
                    images={images}
                />
            </SafeAreaView>
        )
    }
}

/**
 * Precisamos usar o react-navigation para ter acesso ao `navigation` quando essa screen é
 * renderizada como um componente (no `render`).
 */
export default withNavigation(ImageSelectionScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
 * @returns {Promise<{ path: string, mime: string }[]>} promise que completa com uma lista com as imagens selecionadas
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