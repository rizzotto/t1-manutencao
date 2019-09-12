import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextInputComponent from '../Components/TextInputComponent';


 /**
 * props for a textInput container
 * - description: the text behind
 * - type: can be: 
 *      'alphanum': only numbers and letters
 *      'alpha': only letter
 *      'numeric': only numbers
 *      'email': email validation
 *      'date': date validation
 *      '': all
 * bottom border:
 *        green: valid
 *        gray: not valid
 * example: <TextInputContainer type= {'numeric'} description={'Cellphone number'}/>
 */
export default class ContainerTextInput extends React.Component {
 
  constructor() {
    super()
    this.state = {
      text: "",
      validate: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.validate != prevState.validate){
      this.parentCall();
    }
  }

  parentCall = () => {
    this.props.parentCall(this.state.validate);
  }

  onChangeText = (text, type) => {
    this.setState({ text: text }, () => {
      var reNumeric = /^[0-9]+$/
      var reAlphNum = /^[a-z0-9]+$/i
      var reAlph = /^[a-zA-Z]+$/
      var reDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
      var reEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if (type === 'numeric') {
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
      <View style={styles.container}>
        <TextInputComponent 
        keyboardType={this.props.type==='numeric'?'numeric':'default'} 
        onChangeText={(text) => this.onChangeText(text, this.props.type)} 
        value={this.state.text} 
        inputMessage={this.props.description} 
        validate={this.state.validate}  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  }

});
