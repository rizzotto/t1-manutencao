import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ExamItemContainer from './ExamItemContainer';

const makePromise = (url) => {
    return Promise.resolve(url)
}

const data = [
    {
        title: "Lorem Ipsum",
        description: "Dolor sit amet, consectetur adipiscing elit",
        date: new Date(),
        images: [
            { promise: makePromise("https://via.placeholder.com/150") },
            { promise: makePromise("https://via.placeholder.com/300") },
            { promise: makePromise("https://via.placeholder.com/450") },
            { promise: makePromise("https://via.placeholder.com/600") }
        ]
    },
    {
        title: "Item 2",
        description: "Descrição bem legal que deve ser bem grande para testar se vai dar certo mesmo",
        date: new Date("2010-12-12"),
        images: [
            { promise: makePromise("https://via.placeholder.com/150") },
            { promise: makePromise("https://via.placeholder.com/300") },
            { promise: makePromise("https://via.placeholder.com/450") },
            { promise: makePromise("https://via.placeholder.com/600") },
            { promise: makePromise("https://via.placeholder.com/750") },
            { promise: makePromise("https://via.placeholder.com/750") }
        ]
    },
    {
        title: "Terceiro item (váááárias ibagens)",
        description: "beloved...?",
        date: new Date("2009-10-01"),
        images: [
            { promise: makePromise("https://via.placeholder.com/150") },
            { promise: makePromise("https://via.placeholder.com/300") },
            { promise: makePromise("https://via.placeholder.com/450") },
            { promise: makePromise("https://via.placeholder.com/600") },
            { promise: makePromise("https://via.placeholder.com/750") },
            { promise: makePromise("https://via.placeholder.com/750") },
            { promise: makePromise("https://via.placeholder.com/750") },
            { promise: makePromise("https://via.placeholder.com/750") },
            { promise: makePromise("https://via.placeholder.com/750") },
            { promise: makePromise("https://via.placeholder.com/750") }
        ]
    },
    {
        title: "4444444",
        description: "4",
        date: new Date("2005-09-10"),
        images: [
            { promise: makePromise("https://images.unsplash.com/photo-1569271836752-ed9351b75521?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9") },
            { promise: makePromise("https://images.unsplash.com/photo-1569448829586-2e4995a3d607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9") }
        ]
    }
]

export default class ExamsListContainer extends Component {
    render() {
        return (
            <FlatList style={styles.list}
                data={data}
                renderItem={({ item, index }) => (
                    <ExamItemContainer { ...item }
                        style={styles.item}
                        onPress={() => console.warn("press", index)} />
                )}
                keyExtractor={(item) => `exam#${item.date.getTime()}` }
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        marginVertical: 10
    },
    item: {
        marginHorizontal: 20,
        marginVertical: 10
    }
})
