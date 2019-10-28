import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import AppStyle from '../styles';

/**
* @param textStyle estilo do campo de texto
* @param viewStyle estilo da view que comporta o campo
* @param placeholder texto do placeholder do campo de texto
* @param callback função a ser executada ao mudar o valor do campo de texto 
* @return componente com campo de texto acompanhado com ícone de pesquisa
*  - Example:
    myCallBack = (text) => {
          console.warn(text);
      }
    <SearchInputComponent 
      textStyle={styles.text}
      viewStyle={styles.view} 
      placeholder={"teste"} 
      callback={this.myCallBack}></SearchInputComponent>
*/
export default class SearchInputComponent extends Component {

    constructor() {
        super()
        this.state = {
          text: ""
        }
      }

    textCallback = (text) => {
        this.setState({ text: text }, () => {
            this.props.callback(text);
        });
    }

    render() {
      return (
        <View style={[styles.searchView, this.props.viewStyle]}>
          <Image style={styles.image} source={require('../Resources/search.png')} />
          <TextInput
            style={[styles.searchImput, this.props.textStyle]}
            placeholder={this.props.placeholder || 'Pesquisar'}
            onChangeText={(text) => this.textCallback(text)}
            value={this.state.text}
          />
        </View>
      );
    }
}


const styles = StyleSheet.create({
  searchImput: {
    minHeight: 40,
    fontSize: 20,
    textAlign: 'left',
    color: AppStyle.colors.darkGray
  },
  searchView: {
    marginHorizontal: 10,
    paddingLeft: 15,
    borderRadius: 12,
    backgroundColor: AppStyle.colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 20,
    height: 20
  }
})