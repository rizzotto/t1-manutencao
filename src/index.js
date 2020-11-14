import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import React, { useState, useEffect, Text, View } from 'react';
import Routes from './Routes/routes';
import keys from './Config/keys';

// esse arquivo apenas define uma nova função no prototype de React.Component, e isso só precisa ser executado (nenhum tipo é exportado pelo arquivo)
import './Utils/getParam';

const App = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: keys.WEB_CLIENT_ID,
            offlineAccess: true
        });
        _isSignedIn();
    }, []);

    const _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            // Set User Info if user is already signed in
            _getCurrentUserInfo();
        } else {
            console.log('Please Login');
        }
        setGettingLoginStatus(false);
    };

    const _getCurrentUserInfo = async () => {
        try {
            let info = await GoogleSignin.signInSilently();
            console.log('User Info --> ', info);
            setUserInfo(info);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Unable to get user's info");
                console.log("Unable to get user's info");
            }
        }
    };

    const _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            setUserInfo(userInfo);
        } catch (error) {
            console.log('Message', JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signing In');
            } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
            ) {
                alert('Play Services Not Available or Outdated');
            } else {
                alert(error.message);
            }
        }
    };

    if(gettingLoginStatus){
        return (
            <></>
        )
    }
    else{
        return(
            (userInfo === null) ?
                <GoogleSigninButton
                    style={{width: 312, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={_signIn}
                />
            :
                <Routes/>
        )
    }
}

export default App;