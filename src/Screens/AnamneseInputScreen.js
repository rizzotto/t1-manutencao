import React, {Component} from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import createDefaultNavigationOption from './createDefaultNavigationOptions';
import { SimpleTextInputContainer } from '../Containers';
import { ProgressBar } from '../Components';

export default class AnamneseInputScreen extends Component{

    static navigationOptions = createDefaultNavigationOption;

    _onComplete = () => {
        console.log("aqui");
    }

    render() {
        const progress = this.props.progress || this.props.navigation.getParam("progress", .33);

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress} />
                <SimpleTextInputContainer
                    title="Título..."
                    description="Descrição..."
                    buttonText="Continuar"
                    altBtnText="Pular"
                    inputDescription="Placeholder..."
                    keyboardType="alphanumeric"
                    requiredInput={true}
                    callbackToScreen={this._onComplete}
                />
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
