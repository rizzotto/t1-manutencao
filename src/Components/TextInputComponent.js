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
    height: 45,    
    width: 300,
    textAlign: 'left',
    borderBottomWidth: 1.5,
    borderColor: 'green',
  },
  error: {
    height: 45,
    width: 300,
    textAlign: 'left',
    borderBottomWidth: 1.5,
    borderColor: 'lightgray',

  }
})