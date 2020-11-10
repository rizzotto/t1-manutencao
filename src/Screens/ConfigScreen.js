import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, HeaderTitleComponent } from '../Components';
import AppStyle from '../styles';

export default class ConfigScreen extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Configurações" />
                <View style={styles.content}>
                    {/* <Text style={{textAlign: "center"}}>Anamnese</Text> */}
                    <Button text="Realizar login"/>
                    <Button text="Realizar logout"/>
                    <Button text="Deletar meus dados"/>
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
