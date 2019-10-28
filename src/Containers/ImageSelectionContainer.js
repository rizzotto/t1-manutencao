import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TitleDescription, Button } from '../Components';
import { ImageListContainer } from '../Containers';

/**
 * Parâmetros:
 * - `title`: título do container
 * - `description`: descrição do container
 * - `images`: imagens inicialmente exibidas; ver formato no exemplo de uso
 * - `onComplete`: função chamada quando o botão "Continuar" é tocado; as imagens exibidas são passadas como parâmetro
 * - `onAdd`: função chamada quando o botão de adicionar imagens é tocado
 * - `onSelectImage`: função chamada quando uma imagem é tocada; o índice da imagem tocada é passado como parâmetro
 */
export default class ImageSelectionContainer extends Component {
    continue = () => {
        const onComplete = this.props.onComplete
        if (!onComplete) return;
        onComplete(this.props.images)
    }

    add = () => {
        const onAdd = this.props.onAdd
        if (!onAdd) return;
        onAdd()
    }

    /**
     * @param {number} index
     */
    selectImage = (index) => {
        const onSelectImage = this.props.onSelectImage
        if (!onSelectImage) return;
        onSelectImage(index)
    }

    render() {
        const { title, description, images } = this.props
        const buttonEnabled = images.length > 0

        return (
            <View style={styles.container}>
                <ScrollView>
                    <TitleDescription styleView={styles.titleDescription} styleTitle={styles.title}
                        titleText={title}
                        descriptionText={description}
                    />
                    <ImageListContainer style={styles.imageList}
                        add={true}
                        addAction={this.add}
                        isTouchable={true}
                        onSelectItem={this.selectImage}
                        data={images}
                    />
                </ScrollView>
                <Button text="Continuar" isDisabled={!buttonEnabled} action={this.continue} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleDescription: {
        marginBottom: 30
    },
    title: {
        marginBottom: 10
    },
    imageList: {
        marginHorizontal: 20
    }
})
