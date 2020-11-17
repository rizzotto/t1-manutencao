import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import { Button, HeaderTitleComponent } from '../Components';
import { anamnesisService } from '../Database';
import { withUserContext } from '../Context/UserContext';
import AppStyle from '../styles';

/**
 * Tela de histórico de anamneses. (MOCK)
 * 
 * Construída apenas para fazer o fluxo funcionar.
 */
class MainScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.user.user.uid
        }
    }

    _newRecord = () => {
        this.props.navigation.navigate("AnamnesisForm", {
            userId: this.state.userId
        });
    }

    _editLast = () => {
        anamnesisService.getLastAnamnesis(this.state.userId)
            .then(anamnesisRecord => {
                this.props.navigation.navigate("AnamnesisForm", { anamnesisRecord, userId: this.state.userId });
            })
            .catch(() => {
                Alert.alert("Sem fichas antigas", "Nenhuma ficha antiga foi encontrada. Crie uma ficha primeiro.");
            })
    }

    _viewDetailsLast = () => {
        anamnesisService.getLastAnamnesis(this.state.userId)
            .then(anamnesisRecord => {
                this.props.navigation.navigate("AnamnesisDetail", { anamnesisRecord, userId: this.state.userId });
            })
            .catch(() => {
                Alert.alert("Sem fichas antigas", "Nenhuma ficha antiga foi encontrada. Crie uma ficha primeiro.");
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Sua ficha" />
                <View style={styles.content}>
                    <Button text="Nova ficha" action={this._newRecord} />
                    <Button text="Editar última ficha" action={this._editLast} />
                    <Button text="Detalhes da última ficha" action={this._viewDetailsLast} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyle.colors.background
    },
    content: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center"
    }
});

export default withUserContext(MainScreen);