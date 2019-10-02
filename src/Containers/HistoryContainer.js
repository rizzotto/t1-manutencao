import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, SectionList} from "react-native";
import ItemHistoryComponent from '../Components/ItemHistoryComponent';
import { FlatList } from 'react-native-gesture-handler';
import AppStyle from '../styles';
test = (state) => {
    console.warn(state.day, state.month)
}


function Item({ item, action}) {
    return (
        <View style={styles.list}>
            <ItemHistoryComponent
                // callback={this.HistoryContainer.callback}
                callback={test}
                list={item.data}
                hasEmoji={true}
                emoji={item.emoji}
                day={item.day}
                mes={item.mes}
                action={action}
            />
        </View>
    );
}
  
export default class HistoryContainer extends Component {
    // callback = (state) => {
    //     console.warn(state.day, state.month)
    // }
    // callback = (aaa) => {
    //     return (aaa)
    // }
    render(){
        // console.warn(this.callback("teste"))
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Histórico</Text>
                <SectionList
                    
                    stickySectionHeadersEnabled={true}
                    sections={this.props.section}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item item={item} action={this.props.action} style={styles.list}/>}
                    ItemSeparatorComponent={() => <Separator />}
                    renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.year}>{title}</Text>
                    
                    )}
                />
            </View>
        )
    }
}
const Separator = () => <View style={styles.line} />
const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 43,
    },
    line: {
        width: "85%",
        height: 1,
        backgroundColor: AppStyle.colors.mediumGray,
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0
    },
    list: {
        borderColor: AppStyle.colors.mediumGray,
        borderLeftWidth: 1,
        padding:5,
        paddingLeft:0
    },
    year: {
        backgroundColor: "white",
        fontWeight: "bold",
        fontSize: 20,
        width: "100%",
        zIndex: 10,
        paddingVertical: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        paddingBottom: 10
    }

})