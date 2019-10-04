import React, {Component} from 'react';
import CardEmojiContainer from '../Containers/CardEmojiContainer';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import createDefaultNavigationOption from './CreateDefaultNavigationOptions';
import ProgressBarComponent from '../Components/ProgressBarComponent';
import { ProgressBar } from '../Components';


export default class EmojiScreen extends Component{

    static navigationOptions = createDefaultNavigationOption;


    render(){

        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={50}/>
                <CardEmojiContainer></CardEmojiContainer>
            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});