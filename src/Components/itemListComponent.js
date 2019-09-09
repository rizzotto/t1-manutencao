import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import CheckImage from './CheckImage';

export default class ItemListComponent extends Component {

    render(){
        const { selected } = this.props;
        const styles = createStyles(selected);

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text style={styles.textStyle}>
                        {this.props.text}
                    </Text>
                    {selected && <CheckImage style={styles.image}/>}
                </TouchableOpacity>
            </View>
        )
    }
}


const buttonWidth = Math.round(Dimensions.get('window').width);


const createStyles = (selected) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: selected ? '#bfbfbf' : '#FFF',
            width: buttonWidth,
        },
        textStyle: {
            flex: 1,
            flexGrow: 1,
            fontSize: 20,
            textAlign: "left",
            textAlignVertical: "center",
        },
        check: {
            marginLeft: 10
        },
        button: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: "center"
        },
        image: {
            marginLeft: 10,
        }
    })
}

