import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withUserContext } from '../Context/UserContext';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import AppStyle from '../styles';

/**
 * Tela de histórico de anamneses. (MOCK)
 * 
 * Construída apenas para fazer o fluxo funcionar.
 */
class LoginScreen extends Component {

    componentDidMount(){
        this._navigateIfAuth();
    }

    componentDidUpdate(){
        this._navigateIfAuth();
    }

    _navigateIfAuth = () => {
        if(this.props.user.userInfo !== null){
            this.props.navigation.navigate("App");
        }
    }

    _signIn = async () => {
        await this.props.user.signIn();
        this._navigateIfAuth();
    }

    render() {
        if(this.props.user.userInfo === null){
            return (
                <>
                    <GoogleSigninButton
                        onPress={() => this._signIn()}
                    />
                </>
            )
        }
        else{
            return <></>
        }
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

export default withUserContext(LoginScreen);