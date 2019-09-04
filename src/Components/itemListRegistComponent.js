import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class ItemListRegistComponent extends Component {

  // Still needs to Checkbox an item
  // --> States required
  render() {
    return (
      <View style = {this.props.styleView}>
        <FlatList
          data = {[
            {name: 'sympthom1'},
            {name: 'sympthom2'},
          ]}
          renderItem = {({ item }) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})