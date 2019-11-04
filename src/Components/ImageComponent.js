import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import deepDiffer from 'react-native/lib/deepDiffer';

/**
 * @param onClick ação ao clickar na imagem.
 * @param imageObject objeto com informações da imagem (ver `Database/docs/ImageObject.js`); tem preferência sobre `sourceImage` e `promise` (ver comentário na função `_updateImageSource`)
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
  state = {}

  componentDidMount() {
    this._updateImageSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this._updateImageSource(nextProps)
  }

  _updateImageSource = ({ imageObject, sourceImage, promise }) => {
    // esse componente pode ser configurado de três formas diferentes:
    // - `imageObject`: objeto de imagem usado no resto do app (ver `Database/docs/ImageObject.js`)
    // - `sourceImage`: objeto no formato aceito pelo componente de imagem do react native (`Image`); por exemplo, `require(...)` ou `{ uri: "..." }`
    // - `promise`: promise que completa com url para download da imagem
    //
    // quando mais de uma props de configuração for definida, a ordem de preferência é `imageObject`, `sourceImage` e `promise`

    // imagem como esperada pelo react native (`require(...)` ou `{ uri: "..." }`)
    let rnImage

    // promise que completa com url para download da imagem
    let urlPromise

    if (imageObject) {
      rnImage = { uri: imageObject.uri }
      urlPromise = imageObject.promise
    } else {
      rnImage = sourceImage
      urlPromise = promise
    }

    // quando resetamos o estado do componente, setamos que a imagem não está carregada,
    // porque não sabemos se ela já foi carregada em memória; fazemos isso esperando
    // que o componente `Image` do RN chame a função `onLoad`, para atualizar o
    // estado e tirar o loading; entretanto, quando fazemos isso *sem* atualizar
    // a props `source` do `Image`, o RN não chama o `onLoad` novamente; por isso,
    // antes de atualizarmos o estado e re-renderizar o componente, verificamos
    // se a imagem atualmente exibida e a que estamos setando não são iguals;
    // se forem a mesma, poupamos a re-renderização do componente
    const { source: currentSource } = this.state

    // se há uma imagem em exibição e ela é igual à imagem que queremos exibir
    if (currentSource !== null && currentSource !== undefined && !deepDiffer(currentSource, rnImage)) {
      return
    }

    this.setState({
      ...this.state,
      isLoaded: false,
      source: rnImage // se for null, vai esperar a url da promise para atualizar o estado e re-renderizar
    })

    // se rnImage não tiver sido definido (null ou undefined), e houver uma promise
    const hasRNImage = rnImage !== null && rnImage !== undefined && rnImage.uri !== null && rnImage.uri !== undefined
    if (!hasRNImage && urlPromise) {
      // esperar a promise completar e atualizar state para usar url obtida
      urlPromise.then(url => {
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

const IMAGES_PER_LINE = 3
const screenWidth = Math.round(Dimensions.get("window").width)
// 40 de margem horizontal e 2 de margem entre as imagens
const itemWidth = (screenWidth - 40 - 2 * IMAGES_PER_LINE) / IMAGES_PER_LINE

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: itemWidth,
    height: itemWidth
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
