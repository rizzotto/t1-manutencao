import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, Alert } from 'react-native';
import { Button } from '../Components';
import { anamnesisService } from '../Database';
import AppStyle from '../styles';

/**
 * Tela de histórico de anamneses. (MOCK)
 * 
 * Construída apenas para fazer o fluxo funcionar.
 */
export default class AnamnesesRecordsScreen extends Component {
    // TODO: mudar para pegar isso do Firebase, quando login estiver pronto
    userId = "user-id-001"

    _newRecord = () => {
        this.props.navigation.navigate("AnamnesisForm", {
            userId: this.userId
        });
    }

    _editLast = () => {
        anamnesisService.getLastAnamnesis(this.userId)
            .then(anamnesisRecord => {
                this.props.navigation.navigate("AnamnesisForm", { anamnesisRecord, userId: this.userId });
            })
            .catch(() => {
                Alert.alert("Sem fichas antigas", "Nenhuma ficha antiga foi encontrada. Crie uma ficha primeiro.");
            })
    }

    _viewDetailsLast = () => {
        anamnesisService.getLastAnamnesis(this.userId)
            .then(anamnesisRecord => {
                this.props.navigation.navigate("AnamnesisDetail", { anamnesisRecord, userId: this.userId });
            })
            .catch(() => {
                Alert.alert("Sem fichas antigas", "Nenhuma ficha antiga foi encontrada. Crie uma ficha primeiro.");
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{textAlign: "center"}}>Anamnese</Text>
                <Button text="Nova ficha" action={this._newRecord} />
                <Button text="Editar última ficha" action={this._editLast} />
                <Button text="Detalhes da última ficha" action={this._viewDetailsLast} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: AppStyle.colors.background
    }
});
