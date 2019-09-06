import React, {Component} from 'react';
import { View, StyleSheet } from "react-native";
import TitleDescComponent from "../Components/titleDescComponent";
import DefautlButtonComponent from "../Components/defaultButtonComponent";

export default class TextInsertContainer extends Component{

    render(){
        return(
            <View>
                <TitleDescComponent titleText={this.props.tdTitle} 
                    descriptionText={this.props.tdDesc} 
                    styleTitle={styles.title}
                    styleView={{
                        justifyContent: 'flex-start',
                        marginTop: 36
                    }}
                />
                <DefautlButtonComponent 
                    text={this.props.buttonText}
                    viewStyle={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginBottom: 36
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 8,
        marginRight: 8
    }
})