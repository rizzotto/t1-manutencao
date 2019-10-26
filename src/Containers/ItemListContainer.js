import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import AppStyle from '../styles';
import ImageComponent from '../Components/ImageComponent';



/**
 * @author Guilherme Rizzotto, Lucas Justo
 * 
 * @param
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <ExamItemContainer></ExamItemContainer>
 * @return Container do Item dos Exames
 */

export default class ItemListContainer extends Component {
    constructor(props) {
        super(props);
        add = this.props.add
        this.format()
    }
    defaultAction = () => {
        console.log("Funcionalidade não implementada");
    }
    state = {
        // O data precisa ser futuramente substituido por callbacks
        data: this.props.data
    };

    
    format = () =>{
        // console.warn(this.state.data)
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
        console.log(index)
        if (add) {
            if (index === 0) {
                this.props.addAction()
            } else {
                this.props.onSelectItem(index - 1)
            }
        } else {
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