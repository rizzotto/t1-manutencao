import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * @param onClick ação ao clickar na imagem.
 * @param sourceImage require('source da imagem')
 * @param promisse promisse do request do firebase
 */

export default class ImageComponent extends Component {
    render() {
        sourceImage = this.props.sourceImage
        ready = false
        imageStyle = this.props.imageStyle
      return (
            <TouchableOpacity onClick={this.props.onClick}>
                    <Image style={imageStyle==null ? styles.defaultImageStyle : imageStyle}
                        source = {ready ? sourceImage : require('../Resources/loading.gif')}
                    />
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
