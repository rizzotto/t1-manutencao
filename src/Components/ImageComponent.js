import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

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

    this.state = {
      isLoaded: false,
      source: props.sourceImage
    }

    if (props.promise) {
      props.promise.then(url => {
        this.setState({ ...this.state, source: { uri: url } })
      })
    }
  }

  onLoad = () => {
    this.setState({ ...this.state, isLoaded: true })
  }

  render() {
    const { source, isLoaded } = this.state

    return (
      <TouchableOpacity disabled={!this.props.isTouch} onPress={this.props.onClick}>
        <ImageBackground
          style={[styles.image, this.props.imageStyle]}
          source={source}
          onLoad={this.onLoad}
        >
            { !isLoaded && <ActivityIndicator /> }
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110
  }
})
