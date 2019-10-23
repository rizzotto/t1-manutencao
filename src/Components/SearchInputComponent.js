import React, { Component } from 'react';
import { View, Icon, TextInput, StyleSheet } from 'react-native';
import AppStyle from '../styles';

export default class SearchInputComponent extends Component {

    constructor() {
        super()
        this.state = {
          text: ""
        }
      }

    textCallback = (text) => {
        this.setState({ text: text }, () => {
            this.props.textCallback(text);
        });
    }

    render() {
      return (
        <View style={styles.searchView}>
          <Icon name="ios-search"/>
          <TextInput
            style={[styles.searchImput, this.props.style]}
            placeholder={this.props.inputMessage || 'Pesquisar'}
            onChangeText={(text) => this.textCallback(text)}
            value={this.state.text}
            keyboardType={this.props.keyboardType}
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
    borderBottomWidth: 1.5,
    borderColor: AppStyle.colors.main,
    color: AppStyle.colors.mediumGray
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: AppStyle.colors.lightGray
  }
})