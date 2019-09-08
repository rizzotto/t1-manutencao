import React, {Component} from 'react';
import { View, StyleSheet } from "react-native";
import TitleDescComponent from "../Components/titleDescComponent";
import DefautlButtonComponent from "../Components/defaultButtonComponent";

export default class TextInsertContainer extends Component{

    render(){
        return(
            <View> 
                <TitleDescComponent titleText={this.props.title} 
                    descriptionText={this.props.description} 
                    styleTitle={styles.title}
                    styleView={styles.titleView}
                />
                <DefautlButtonComponent 
                    text={this.props.buttonText}
                    viewStyle={styles.buttonView}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 8,
        marginRight: 8
    },
    titleView: {
        justifyContent: 'flex-start',
        marginTop: 25
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40
    }
})