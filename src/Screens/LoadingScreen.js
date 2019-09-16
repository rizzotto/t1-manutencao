import React, { Component } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Animated, StyleSheet, Dimensions } from 'react-native';
import { Button } from '../Components';
import AppStyle from '../styles';

/**
 * Screen com loading e suporte a exibição de erro.
 * 
 * Parâmetros:
 *   - `operation`: operação assíncrona na qual o loading se baseia;
 *   - `minimumLoadingTime`: tempo mínimo de carregamento, em milisegundos (padrão 2s).
 */
export default class LoadingScreen extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            hasError: false
        }

        this.minimumLoadingTime = this.getParam("minimumLoadingTime", 2000);

        const originalOperation = this.getParam("operation");
        if (!originalOperation) return;

        // se a promise final falhar, então iniciamos a animação do erro, com as informações da rejeição
        const finalPromise = this._addMinimumDuration(originalOperation);
        finalPromise.catch(this._startAnimation);
    }

    /**
     * Encapsula a promise passada como parâmetro para dar uma duração mínima ao loading.
     * @param {Promise} originalPromise promise da operação realizada durante o loading, que deve ter uma duração mínima
     * @returns {Promise} nova promise que completa quando a promise original completa ou quando o timer do tempo mínimo termina, o que acontecer por último
     */
    _addMinimumDuration = (originalPromise) => {
        // o comportamento padrão de Promise.all é completar (fulfill) quando todas as promises
        // passadas como parâmetro completam, ou quando qualquer uma delas falha (reject)
        // como precisamos esperar duas promises completarem, precisamos transformar a promise
        // original para que ela não falhe (reject)

        // transformar promise original para não falhar
        const notThrowingPromise = originalPromise
            .then(result => { return { result, error: false }},
                  error => { return { result: error, error: true }});
        
        // promise que completa quando o timer do tempo mínimo completa
        const minimumLoadingTimePromise = new Promise(resolve => setTimeout(resolve, this.minimumLoadingTime));

        // juntar as promises com Promise.all e, quando ambas completarem, usar o resultado da
        // primeira (results[0]) como resultado da promise criada com Promise.all
        const promise = Promise.all([notThrowingPromise, minimumLoadingTimePromise])
            .then(results => {
                const { result, error } = results[0];
                // se a promise original falhou, replicar o erro
                // (essa promise pode falhar, porque o timer já completou (nesse contexto))
                if (error) return Promise.reject(result);

                // se não falhou, então usar o resultado da promise original como resultado dessa promise
                return result;
            });

        return promise;
    }

    /**
     * Inicia a animação para exibir a view com os detalhes do erro.
     * @param {{ title: string, description: string }} errorInfo objeto com informações do erro
     */
    _startAnimation = (errorInfo) => {
        const screenHeight = Dimensions.get("screen").height;

        this.setState({
            hasError: true,
            errorInfo,
            // posição inicial do bottom da view (tamanho da tela, para que não começe aparecendo)
            bottomOffset: new Animated.Value(-screenHeight)
        })

        Animated.timing(this.state.bottomOffset, {
            toValue: 0, // posição final do bottom da view
            duration: 0.5 * 1000
        }).start()
    }

    render() {
        // se não há erro (ainda está carregando)
        if (!this.state.hasError) {
            return (
                <View style={styles.containerLoading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            );
        }

        // senão, então temos que mostrar o erro
        const { title, description } = this.state.errorInfo;
        const dismiss = () => this.props.navigation.goBack();

        return (
            <View style={styles.container}>
                <View style={styles.backdrop} />
                <Animated.View style={{...styles.animatedContainer, bottom: this.state.bottomOffset}}>
                    <SafeAreaView style={styles.safeAreaContainer}>
                        <ErrorView
                            title={title}
                            description={description}
                            onConfirm={dismiss}
                        />
                    </SafeAreaView>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        backgroundColor: "#000",
        opacity: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    backdrop: {
        flex: 1,
        backgroundColor: "#000",
        opacity: 0.5
    },
    animatedContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    safeAreaContainer: {
        backgroundColor: AppStyle.colors.background
    }
});

/**
 * Componente que exibe os detalhes de um erro.
 * 
 * Parâmetros:
 *   - `title`: título do erro;
 *   - `description`: descrição do erro;
 *   - `buttonText`: texto exibido no botão;
 *   - `onConfirm`: função chamada quando o botão é clicado.
 */
const ErrorView = ({ title, description, buttonText = "OK", onConfirm }) => {
    return (
        <View style={errorStyles.container}>
            <Text style={errorStyles.title}>{title}</Text>
            <Text style={errorStyles.description}>{description}</Text>
            <Button style={errorStyles.button} text={buttonText} action={onConfirm}/>
        </View>
    )
}

const errorStyles = StyleSheet.create({
    container: {
        backgroundColor: AppStyle.colors.background
    },
    title: {
        marginTop: 20,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        color: AppStyle.colors.darkText
    },
    description: {
        marginVertical: 10,
        marginHorizontal: 20,
        fontSize: 18,
        textAlign: "center",
        color: AppStyle.colors.darkGray
    },
    button: {
        backgroundColor: AppStyle.colors.error
    }
});
