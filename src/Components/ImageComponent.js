import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * @param onClick ação ao clickar na imagem.
 * @param sourceImage require('source da imagem')
 * @param promise promise do request do firebase
 * @param isTouch isTouch=true ou isTouch=false
 * Exemplo de promise
 * const ttt = new Promise((res, rej) => {
      setTimeout(() => {
        res("https://i.pinimg.com/236x/eb/fa/0a/ebfa0af9eda21be41e635bbdd8149323--pool-scrap.jpg")
      }, 3000);
    })
 */

export default class ImageComponent extends Component {
  constructor(props) {
    super(props)

    if (props.sourceImage) {
      this.state = {
        sourceImage: props.sourceImage
      }
    } else {
      this.state = {
        sourceImage: null
      }

      props.promise.then(url => {
        this.setState({ ...this.state, sourceImage: { uri: url } })
      })
    }
  }

  render() {
    const sourceImage = this.state.sourceImage
    const ready = sourceImage !== null
    const isTouch = this.props.isTouch === null ? false : this.props.isTouch
    imageStyle = this.props.imageStyle
    if (isTouch === true) {
      return (

        <TouchableOpacity onPress={this.props.onClick}>
          {
            ready
              ? <Image style={[styles.defaultImageStyle, imageStyle]}
                source={sourceImage}
              />
              : <ActivityIndicator style={styles.defaultImageStyle} color="#f00" />
          }

        </TouchableOpacity>
      );
    }


    else {
      return (
            ready
              ? <Image style={[styles.defaultImageStyle, imageStyle]}
                source={ sourceImage }
              />
              : <ActivityIndicator style={styles.defaultImageStyle} color="#f00" />
      );
    }

  }
}

const styles = StyleSheet.create({
  defaultImageStyle: {
    width: 110,
    height: 110,
    // margin: '0.5%',
  }
});
