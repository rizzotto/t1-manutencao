import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HeaderTitleComponent } from '../Components';

export default class JournalsScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Diário" />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
