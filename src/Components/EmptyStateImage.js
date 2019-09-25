import React from 'react';
import { Image, StyleSheet } from 'react-native';

const EmptyStateImage = ({ style }) => <Image style={[styles.image, style]} source={require('../Resources/emptyState.png')} />

export default EmptyState;

const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20
    }
});
