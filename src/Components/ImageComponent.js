import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * @param onClick ação ao clickar na imagem.
 * @param sourceImage require('source da imagem')
 * @param promise promise do request do firebase
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

      this.state = {
        sourceImage: null
      }

      props.promise.then(url => {
        this.setState({ ...this.state, sourceImage: url })
      })
    }

    render() {
        const sourceImage = this.state.sourceImage
        const ready = sourceImage !== null
        imageStyle = this.props.imageStyle
      return (
            <TouchableOpacity onClick={this.props.onClick}>
              {
                ready
                ? <Image style={[styles.defaultImageStyle, imageStyle]}
                    source = {{ uri: sourceImage }}
                />
                : <ActivityIndicator style={styles.defaultImageStyle} color="#f00" />
              }
                    
            </TouchableOpacity>
      );
    }
  }

  const styles = StyleSheet.create({
    defaultImageStyle: {
        width: 100,
        height: 100,
        margin: '0.5%',
    }
});
