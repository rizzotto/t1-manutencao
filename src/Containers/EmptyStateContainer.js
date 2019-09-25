import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import EmptyStateImage from '../Components/EmptyStateImage.png';


import DefaultButtonComponent from '../Components/DefaultButtonComponent';
import TitleDescComponent from '../Components/TitleDescComponent';
import AppStyle from '../styles';

export default class TextInputContainer extends Component {
    render() {
        return (
                <DefaultButtonComponent />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        backgroundColor: AppStyle.colors.background,
    },
    enter: {
        justifyContent: "center",
        alignItems: "center",
        width: "10%"

    },
});
