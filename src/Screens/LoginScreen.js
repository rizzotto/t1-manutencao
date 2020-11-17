import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { withUserContext } from '../Context/UserContext';
import { GoogleSigninButton } from '@react-native-community/google-signin';

class LoginScreen extends Component {

    componentDidMount(){
        this._navigateIfAuth();
    }

    componentDidUpdate(){
        this._navigateIfAuth();
    }

    _navigateIfAuth = () => {
        if(this.props.user.loggedIn === true){
            this.props.navigation.navigate("App");
        }
    }

    _signIn = async () => {
        await this.props.user.signIn();
        this._navigateIfAuth();
    }

    render() {
        if(this.props.user.loggedIn === false && !this.props.user.fetching){
            return (
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../Resources/logo.png')} />
                    <GoogleSigninButton
                        style={styles.button}
                        size={GoogleSigninButton.Size.Wide}
                        onPress={() => this._signIn()}
                    />
                </View>
            )
        }
        else{
            return (
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../Resources/logo.png')} />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginBottom: 90,
    },
    button: {
        width: 290, 
        height: 60, 
    }
});

export default withUserContext(LoginScreen);