import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import AppStyle from '../styles';

export default class TextInputComponent extends Component {


  render() {
    return (
      <TextInput
        style={[this.props.validate?styles.textInput:styles.error, this.props.style]}
        placeholder={this.props.inputMessage}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
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