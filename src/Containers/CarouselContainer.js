import React, { Component } from 'react';
import { FlatList, View, Text, Item, StyleSheet, SafeAreaView } from 'react-native';


export default class CarouselContainer extends Component {
    

    render(){
        const DATA = [
            {
                id: '1',
                emoji: ':D'
            },
            {
                id: '2',
                emoji: ':|'
            },
            {
                id: '3',
                emoji: ':('
            },
            {
                id: '4',
                emoji: ':P'
            },
            {
                id: '5',
                emoji: ':)'
            },
            {
                id: '6',
                emoji: '>.<'
            }
        ];

        function Item({ title }) {
            return (
              <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
              </View>
            );
          }

        return(

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.emoji} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
            </SafeAreaView>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        marginBottom: 400,
        height: 100,
        
    },
    item: {
      backgroundColor: '#ddd',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });