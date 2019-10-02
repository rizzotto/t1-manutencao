import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default class JournalsScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>DIÁRIO</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
