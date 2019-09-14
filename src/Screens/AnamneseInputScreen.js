import React, {Component} from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import TitleInputContainer from '../Containers/TitleInputContainer';
import createDefaultNavigationOption from './createDefaultNavigationOptions';
import ProgressBar from '../Components/ProgressBarComponent';

export default class AnamneseInputScreen extends Component{

    static navigationOptions = createDefaultNavigationOption;

    _onComplete = () => {
        console.log("aqui");
    }

    render(){
        const progress = this.props.progress || this.props.navigation.getParam("progress", 0);

        return(
            <SafeAreaView styles={styles.container}>
                <ProgressBar width={progress}/>
                <TitleInputContainer
                    title="Nome"
                    buttonText="Enviar"
                    altBtnText="Pular"
                    keyboardType="alphanumeric"
                    inputDescription={"Nome e sobrenome"}
                    requiredInput={true}
                    callbackToScreen={this._onComplete}
                />
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        //alignItems: "stretch" 
    }
});
