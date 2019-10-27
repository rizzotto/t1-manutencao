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

    // se tem algum children, não mostra o loading
    const showsLoading = this.props.children === null || this.props.children === undefined

    return (
      <TouchableOpacity disabled={!this.props.isTouch} onPress={this.props.onClick}>
        <ImageBackground
          style={[styles.image, this.props.imageStyle]}
          source={source}
          onLoad={this.onLoad}
        >
          { showsLoading && !isLoaded
              ? <ActivityIndicator />
              : this.props.children
          }
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
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  }
})
