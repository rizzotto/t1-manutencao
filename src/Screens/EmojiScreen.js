import React, {Component} from 'react';
import CardEmojiContainer from '../Containers/CardEmojiContainer';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import createDefaultNavigationOption from './CreateDefaultNavigationOptions';
import { ProgressBar } from '../Components';


export default class EmojiScreen extends Component{

    static navigationOptions = createDefaultNavigationOption;


    selectedEmoji = (emoji) => {
        const onComplete = this.getParam("onComplete");
        if (!onComplete) return;
        onComplete(emoji);
    }

    render(){

        const progress = this.getParam("progress");
        return (
            <SafeAreaView style={styles.container}>
                <ProgressBar width={progress}/>
                <CardEmojiContainer
                    callback={this.selectedEmoji}
                />
            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});