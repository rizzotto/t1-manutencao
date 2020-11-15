import React from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import keys from '../Config/keys';

const UserContext = React.createContext({});

export class UserContextProvider extends React.Component {
    state = {
        userInfo: null
    }

    constructor(){
        super();
        this._configureGoogleSign();
        this._isSignedIn();
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const user = await GoogleSignin.signIn();
            this.setState({
                userInfo: user
            });
        } catch (error) { }
    };
    
    _configureGoogleSign = () => {
        GoogleSignin.configure({
          webClientId: keys.WEB_CLIENT_ID,
          offlineAccess: false
        });
    };

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            this._getCurrentUserInfo();
        }
    };

    _getCurrentUserInfo = async () => {
        try {
            const info = await GoogleSignin.signInSilently();
            this.setState({
                userInfo: info
            });
        } catch (error) { }
    };

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                userInfo: null
            })
        } catch (error) { }
    };

    render() {
        return (
            <UserContext.Provider
                value={{
                    ...this.state,
                    isSignedIn: this._isSignedIn,
                    getCurrentUserInfo: this._getCurrentUserInfo,
                    signIn: this._signIn,
                    signOut: this._signOut,
                    configureAuth: this._configureGoogleSign
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export const withUserContext = ChildComponent => props => (
    <UserContext.Consumer>
        {
            context => <ChildComponent {...props} user={context} />
        }
    </UserContext.Consumer>
);