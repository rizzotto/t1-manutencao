import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class TextInputComponent extends Component {


  render() {
    return (
      <TextInput
        style={this.props.validate?styles.textInput:styles.error}
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
    width: 300,
    textAlign: 'left',
    borderBottomWidth: 1.5,
    borderColor: 'green',
    padding:-10,
  },
  error: {
    width: 300,
    textAlign: 'left',
    borderBottomWidth: 1.5,
    borderColor: 'lightgray',
    padding:-10,

  }
})