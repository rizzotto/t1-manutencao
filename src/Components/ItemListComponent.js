import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import CheckImage from './CheckImage';
import AppStyle from '../styles';

export default class ItemListComponent extends Component {

    render(){
        const { selected, pressDisabled } = this.props;
        const styles = createStyles(selected);

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.props.onPress} disabled={pressDisabled}>
                    <Text style={styles.textStyle}>
                        {this.props.text}
                    </Text>
                    {selected && <CheckImage style={styles.image}/>}
                </TouchableOpacity>
            </View>
        )
    }
}

const createStyles = (selected) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: selected ? AppStyle.colors.lightGray : AppStyle.colors.background,
        },
        textStyle: {
            flex: 1,
            flexGrow: 1,
            fontSize: 20,
            textAlign: "left",
            textAlignVertical: "center",
        },
        button: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: "center"
        },
        image: {
            marginLeft: 10,
        }
    })
}

