import React, {Component} from 'react';
import CarouselContainer from '../Containers/CarouselContainer';
import CardEmojiContainer from '../Containers/CardEmojiContainer';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';

export default class CarouselScreen extends Component{

    render(){

        const data = [
            {text: "Raiva", emoji: "😡" },
            {text: "Cansado", emoji: "😞" },
            {text: "Chateado", emoji: "😕" },
            {text: "Contente", emoji: "🙂" },
            {text: "Feliz", emoji: "😄" },
            {text: "Tanto Faz", emoji: "😐" }
        ]

        return(
                <CarouselContainer data={data}/>
            
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});