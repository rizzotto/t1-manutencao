import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Button } from '../Components';
import createTabBarIcon from './createTabBarIcon';

/**
 * Tela de histórico de anamneses. (MOCK)
 * 
 * Construída apenas para fazer o fluxo funcionar.
 */
export default class AnamnesesRecordsScreen extends Component {
    static navigationOptions = {
        title: "Ficha",
        tabBarIcon: createTabBarIcon(require("../Resources/anamnesesTabBarIcon.png"))
    }

    _newRecord = () => {
        this.props.navigation.navigate("AnamnesisForm");
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Anamnese</Text>
                <Button text="Nova ficha" action={this._newRecord} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
