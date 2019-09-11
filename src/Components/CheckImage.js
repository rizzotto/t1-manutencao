import React from 'react';
import { Image, StyleSheet } from 'react-native';

const CheckImage = ({ style }) => <Image style={[styles.image, style]} source={require('../Resources/check.png')} />

export default CheckImage;

const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20
    }
});
