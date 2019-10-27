import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppStyle from '../styles';

const Arrow = ({ direction, disabled, style, onPress }) => {
    const styles = createStyles(direction, disabled)

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Image style={[styles.image, style]} source={require('../Resources/Arrow.png')} />
        </TouchableOpacity>
    )
};

export default Arrow;

const createStyles = (direction, disabled) => {
    
    return StyleSheet.create({
        image: {
            width: 25,
            height: 25,
            tintColor: disabled ? AppStyle.colors.lightGray : AppStyle.colors.mediumGray,
            transform: [
                { rotateY: direction === "left" ? "180deg" : "0deg" }
            ]
        }
    })
}
