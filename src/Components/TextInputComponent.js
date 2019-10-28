import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import AppStyle from '../styles';
import { TextInputMask } from 'react-native-masked-text';

export default class TextInputComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.value != prevProps.value) {
      this.setState({ text: this.props.value }, () => {
      });
    }
  }

  render() {
    const mask = this.props.mask;
    if (!mask) {
      return (
        <TextInput
          style={[this.props.validate ? styles.textInput : styles.error, this.props.style]}
          placeholder={this.props.inputMessage}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
        />
      );
    }
    else {
      const options = mask.options ? mask.options : null;
      return (
        <TextInputMask
          style={[this.props.validate ? styles.textInput : styles.error, this.props.style]}
          placeholder={this.props.inputMessage}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
          type={mask.maskType}
          options={options}
        />
      );

    }
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