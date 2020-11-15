import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, HeaderTitleComponent } from '../Components';
import { withUserContext } from '../Context/UserContext';
import { userService } from '../Database';
import AppStyle from '../styles';

export class ConfigScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            fetching: false
        }
    }

    _signOut = async () =>{
        this.setState({
            fetching: true
        })
        await this.props.user.signOut();
        this.props.navigation.navigate("Auth");
    }

    _deleteAllData = () => {
        this.setState({
            fetching: true
        })
        userService.purgeUserData(this.props.user.user.uid).then(() => {
            this.setState({
                fetching: false
            })
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Configurações" />
                <View style={styles.content}>
                    {/* <Text style={{textAlign: "center"}}>Anamnese</Text> */}
                    <Button isDisabled={this.state.fetching} text="Realizar logout" action={() => this._signOut()}/>
                    <Button isDisabled={this.state.fetching} text="Deletar meus dados" action={() => this._deleteAllData()}/>
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