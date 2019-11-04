import React, {Component} from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import ImageComponent from '../Components/ImageComponent';

// imagens exibidas por linha
const IMAGES_PER_LINE = 3

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
        this.setState({ ...this.state, ...newState })
    }

    normalizeData = ({ data, add }) => {
        const finalImages = data.slice()

        if (add) {
            finalImages.unshift({ add: true })
        }

        const imagesOnLastLine = finalImages.length % IMAGES_PER_LINE
        if (imagesOnLastLine !== 0) {
            let whitespaceToAdd = IMAGES_PER_LINE - imagesOnLastLine
            while (whitespaceToAdd > 0) {
                finalImages.push({ white: true })
                whitespaceToAdd = whitespaceToAdd - 1
            }
        }

        return {
            add,
            data: finalImages
        }
    }

    onClickItem = (index) => {
        const onSelectItem = this.props.onSelectItem
        if (!onSelectItem) return;

        // se tiver o botão de adicionar no início, normalizar índice
        onSelectItem(this.state.add ? index - 1 : index)
    }

    onClickAdd = () => {
        const addAction = this.props.addAction
        if (!addAction) return;
        addAction()
    }

    render(){
        return(
            <FlatList style={this.props.style}
                numColumns={IMAGES_PER_LINE}
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (item.add) {
                        return (
                            <ImageComponent imageStyle={styles.item}
                                sourceImage={require("../Resources/add.png")}
                                isTouch={this.props.isTouchable}
                                onClick={this.onClickAdd}
                            />
                        )
                    } else if (item.white) {
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

const screenWidth = Math.round(Dimensions.get("window").width)
// 40 de margem horizontal e 2 de margem entre as imagens
const itemWidth = (screenWidth - 40 - 2 * IMAGES_PER_LINE) / IMAGES_PER_LINE

const styles = StyleSheet.create({
    item: {
        flexGrow: 1,
        flexBasis: 0,
        margin: 1,
        width: itemWidth,
        height: itemWidth
    }
})
