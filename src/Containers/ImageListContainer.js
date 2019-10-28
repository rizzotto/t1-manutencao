import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import ImageComponent from '../Components/ImageComponent';



/**
 * @author Guilherme Rizzotto, Lucas Justo
 * 
 * @param add boolean que diz se haverá a opção de adicionar fotos (+)
 * @param data lista de imagens a serem mostradas pelo container
 * @param addAction método para o botão add
 * @param onSelectItem método que trata o click nas fotos (recebe indice por parametro)
 * @param isTouchable boolean que diz se as imagens da lista serão clickaveis
 * 
 * @return Container da lista de imagem
 * Exemplo de uso: 
 * <ImageListContainer 
 *  add={true} 
 *  data={imageList} 
 *  addAction={selectImages}
 *  onSelectItem={onClickImage}
 *  isTouchable={true} />
 */

export default class ImageListContainer extends Component {
    constructor(props) {
        super(props)

        const state = this.normalizeData(props)
        this.state = {
            ...state
        }
    }

    componentWillReceiveProps(nextProps) {
        const newState = this.normalizeData(nextProps)
        console.log("willreceiveprops", nextProps, newState)
        this.setState({ ...this.state, ...newState })
    }

    normalizeData = ({ data, add }) => {
        const finalImages = data.slice()

        if (add) {
            // TODO: simplify
            finalImages.unshift({ sourceImage: require("../Resources/add.png") })
        }

        const imagesPerLine = 3
        const imagesOnLastLine = finalImages.length % imagesPerLine
        if (imagesOnLastLine !== 0) {
            let whitespaceToAdd = imagesPerLine - imagesOnLastLine
            while (whitespaceToAdd > 0) {
                // TODO: simplify
                finalImages.push({ sourceImage: require("../Resources/whiteImage.png"), white: true })
                whitespaceToAdd = whitespaceToAdd - 1
            }
        }

        return {
            add,
            data: finalImages
        }
    }

    onClickItem = (index) => {
        if (this.state.add) {
            if (index === 0) {
                this.props.addAction()
            } else {
                this.props.onSelectItem(index - 1)
            }
        } 
        else {
            this.props.onSelectItem(index)
        }
    }

    render(){
        return(
            <FlatList style={this.props.style}
                numColumns={3}
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (item.white) {
                        return <View style={styles.item} />
                    } else {
                        return (
                            <ImageComponent imageStyle={styles.item}
                                onClick={() => this.onClickItem(index)}
                                isTouch={this.props.isTouchable}
                                {...item}
                            />
                        )
                    }
                }}
            />
        )
        
    }
}

const styles = StyleSheet.create({
    item: {
        flexGrow: 1,
        flexBasis: 0,
        margin: 1,
        width: 110,
        height: 110
    }
})
