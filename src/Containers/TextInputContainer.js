import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextInputComponent from '../Components/TextInputComponent';
import AppStyle from '../styles';


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

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.validateCallback !== undefined){
      if(this.state.validate != prevState.validate || prevState.text == "" && this.state.text.length >= 1 || prevState.text != "" && this.state.text == ""){
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
    this.setState({ text: text }, () => {
      if(this.props.textCallback !== undefined){
        this.textCallback();
      }
      var reNumeric = /^\d+(?:[\.,]\d+)?$/
      var reAlphNum = /^[a-z0-9 ]+$/i
      var reAlph = /^[a-zA-Z ]+$/
      var reDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
      var reEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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
      

      else if(type === 'email'){
        if(reEmail.test(this.state.text)){
          this.setState({
            validate: true
          })
        }
        else{
          this.setState({
            validate: false
          })
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
        keyboardType={this.props.type==='numeric'?'numeric':'default'} 
        onChangeText={(text) => this.onChangeText(text, this.props.type)} 
        value={this.state.text} 
        inputMessage={this.props.description} 
        validate={this.state.validate}
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
