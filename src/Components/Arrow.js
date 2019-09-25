import React from 'react';
import { Image, StyleSheet } from 'react-native';
import AppStyle from '../styles';

const CheckImage = ({ style }) => <Image style={[styles.image, style]} source={require('../Resources/Arrow.png')} />

export default CheckImage;

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
        tintColor: AppStyle.colors.lightGray
    }
});
