import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from 'react-native';
import DetailExamContainer from '../Containers/DetailExamContainer';

export default class ExamVisualizationScreen extends Component {
    userId = "user-id-001"

    constructor(props) {
        super(props)
        
        this.state = {
            selectedImage: false
        }
    }


    imageSelected = (image) => {
        this.props.navigation.navigate("Gallery", {
            image: image
        })
    }
    
    render() {
        const exame = this.props.navigation.state.params.exam;
        return (
            <SafeAreaView style={styles.container}>
                <DetailExamContainer 
                    exame={exame} 
                    imageToScreen={this.imageSelected}  
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
})
