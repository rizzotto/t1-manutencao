import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, HeaderTitleComponent } from '../Components';
import { withUserContext } from '../Context/UserContext';
import AppStyle from '../styles';

export class ConfigScreen extends Component {

    _signOut = async () =>{
        await this.props.user.signOut();
        this.props.navigation.navigate("Auth");
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Configurações" />
                <View style={styles.content}>
                    {/* <Text style={{textAlign: "center"}}>Anamnese</Text> */}
                    <Button text="Realizar logout" action={() => this._signOut()}/>
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

export default withUserContext(ConfigScreen);