import React from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import { auth, authProvider } from '../Database/Firebase';
import keys from '../Config/keys';

const UserContext = React.createContext({});

export class UserContextProvider extends React.Component {
    state = {
        user: [],
        loggedIn: false,
        fetching: true
    }

    componentDidMount(){
        this._configureGoogleSignin();
        const subscriber = auth.onAuthStateChanged(this._onAuthChange);
        return subscriber;
    }

    _onAuthChange = (user) => {
        this.setState({user: user, fetching: false});
        if(user) this.setState({loggedIn: true});
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const user = await GoogleSignin.signIn();
            this.setState({ fetching: true });
            const {accessToken, idToken} = user;
            const credential = authProvider.credential(idToken, accessToken);
            await auth.signInWithCredential(credential);
        } catch (error) { }
    };
    
    _configureGoogleSignin = () => {
        GoogleSignin.configure({
          webClientId: keys.WEB_CLIENT_ID,
          offlineAccess: false
        });
    };

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth.signOut();
            this.setState({
                loggedIn: false
            })
        } catch (error) { }
    };

    render() {
        return (
            <UserContext.Provider
                value={{
                    ...this.state,
                    signIn: this._signIn,
                    signOut: this._signOut,
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