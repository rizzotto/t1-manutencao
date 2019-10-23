import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
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
        <TextInput
          style={[this.props.validate?styles.textInput:styles.error, this.props.style]}
          placeholder={this.props.inputMessage || 'Pesquisar'}
          onChangeText={(text) => this.textCallback(text)}
          value={this.state.text}
          keyboardType={this.props.keyboardType}
        />
      );
    }
}


const styles = StyleSheet.create({
  textInput: {
    minHeight: 40,
    fontSize: 20,
    textAlign: 'left',
    borderBottomWidth: 1.5,
    borderColor: AppStyle.colors.main
  },
  error: {
    minHeight: 40,
    fontSize: 20,
    textAlign: 'left',
    borderBottomWidth: 1.5,
    borderColor: AppStyle.colors.darkGray
  }
})