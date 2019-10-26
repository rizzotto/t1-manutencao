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
 * <ItemListContainer 
 *  add={true} 
 *  data={imageList} 
 *  addAction={selectImages}
 *  onSelectItem={onClickImage}
 *  isTouchable={true} />
 */

export default class ItemListContainer extends Component {
    constructor(props) {
        super(props);
        add = this.props.add
        this.format()
    }
    state = {
        data: this.props.data
    };

    
    format = () =>{
        if(add){
            this.state.data.unshift({id:0,sourceImage:require("../Resources/add.png")});
            for(var i=1;i<this.state.data.length;i++){
                this.state.data[i].id += 1
            }
        }
        
        whiteImages = 3-(this.state.data.length%3)
        for(var i=1;i<=whiteImages;i++){
            this.state.data.push({id:this.state.data.length-1+i, sourceImage: require("../Resources/whiteImage.png"), white: true})
        }
    }

    onClickItem = (index) => {
        if (add) {
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
            <View style = {styles.container}>
                <FlatList
                    style={styles.list}
                    numColumns={3}
                    initialNumToRender={5}
                    data={this.state.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.item}>
                                {item.white?<Image source={item.sourceImage} style={styles.image}></Image>
                                :<ImageComponent onClick={() => this.onClickItem(index)} isTouch={this.props.isTouchable} style = {styles.image} {...item}/>}
                            </View>
                        );   
                    }}
                />
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "3%",
        
    },
    item: {
        flexBasis: 0,
        alignItems: "center",
        flexGrow: 1,
        margin: 5,
        minWidth: 100,
        minHeight: 100
    },
    image:{
        width: "100%",
        height: 125
    },
})