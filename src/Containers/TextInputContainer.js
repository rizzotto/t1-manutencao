import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextInputComponent from '../Components/TextInputComponent';
import AppStyle from '../styles';
import * as OutputFilters from '../Utils/OutputFilters';


/**
* props for a TextInputContainer
* - description: the text behind
* - initialContent: text initially set on text input
* - type: can be: 
*      'alphanum': only numbers and letters
*      'alpha': only letter
*      'numeric': only numbers
*      'email': email validation
*      'date': date validation
*      '': all
* - parentCall: (optional) callback function that recieves the validate and text states. 
* - maskType: (optional) tipo de mascara para input
* bottom border:
*        green: valid
*        gray: not valid
* example: <TextInputContainer type= {'numeric'} description={'Cellphone number'}/>
*/
export default class TextInputContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      text: "",
      validate: false,
    }
  }


  componentDidMount() {
    // setar valor inicial e rodar validação
    this.onChangeText(this.props.initialContent || "", this.props.type);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.validateCallback !== undefined) {
      if (this.state.validate != prevState.validate || prevState.text == "" && this.state.text.length >= 1 || prevState.text != "" && this.state.text == "") {
        this.validateCallback();
      }
    }
  }

  validateCallback = () => {
    this.props.validateCallback(this.state.validate);
  }

  textCallback = () => {
    this.props.textCallback(this.state.text, this.props.index);
  }

  onChangeText = (text, type) => {
    const textInput = new OutputFilters.TextInputOutputFilter();


    this.setState({ text: text }, () => {
      if (this.props.textCallback !== undefined) {
        this.textCallback();
      }
      const reNumeric = /^\d+(?:[.,]\d+)?$/
      const reAlphNum = /^[a-z0-9 ]+$/i
      const reAlph = /^[a-zA-Z ]+$/
      const reDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
      const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const rePressure = /^([0-9][0-9])(\/)([0-9][0-9])/
      const reHeight = /^([0-2])(,)([0-9][0-9])/

      if (this.props.required && !this.state.text) {
        this.setState({
          validate: false
        })
      }
      else if (type === 'numeric') {
        if (reNumeric.test(this.state.text)) {
          this.setState({
            validate: true
          })
        }
        else {
          this.setState({
            validate: false
          })
        }
      }
      else if (type === 'date') {
        if (reDate.test(this.state.text)) {
          const dateFormat = textInput.date(this.state.text);
          const dateToday = new Date();
          if (dateFormat < dateToday) {
            this.setState({
              validate: true
            })
          }
        }
        else {
          this.setState({
            validate: false
          })
        }
      }
      else if (type === 'email') {
        if (reEmail.test(this.state.text)) {
          this.setState({
            validate: true
          })
        }
        else {
          this.setState({
            validate: false
          })
        }
      }
      else if (type === 'height') {
        if (reHeight.test(this.state.text)) {
          this.setState({ validate: true })
        } else {
          this.setState({ validate: false })
        }
      }
      else if (type === 'pressure') {
        if (rePressure.test(this.state.text)) {
          this.setState({ validate: true })
        } else {
          this.setState({ validate: false })
        }
      }
      else if (type === 'alphanumeric') {
        if (reAlphNum.test(this.state.text)) {
          this.setState({
            validate: true
          })
        }
        else {
          this.setState({
            validate: false
          })
        }
      }
      else if (type === 'alpha') {
        if (reAlph.test(this.state.text)) {
          this.setState({
            validate: true
          })
        }
        else {
          this.setState({
            validate: false
          })
        }
      }
      else {
        this.setState({
          validate: true
        })
      }

    })
  }

  render() {
    return (
      <TextInputComponent style={styles.container}
        keyboardType={this.props.type === 'numeric' ? 'numeric' : 'default'}
        onChangeText={(text) => this.onChangeText(text, this.props.type)}
        value={this.state.text}
        inputMessage={this.props.description}
        validate={this.state.validate}
        mask={this.props.inputMask}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: AppStyle.colors.background,
  }
});
