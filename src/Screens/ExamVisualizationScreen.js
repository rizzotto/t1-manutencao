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
                <View style={styles.header}>
                    <DetailExamContainer 
                        exame={exame} 
                        imageToScreen={this.imageSelected}
                        
                    />

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 16
    },

    headerLeftRightContainer: {
        flex: 1
    },
    headerCenterContainer: {
        flex: 2
    },

    headerLeft: {
        fontSize: 17,
        color: "#fff"
    },
    headerRight: {
        fontSize: 17,
        color: "#fff",
        textAlign: "right"
    },
    headerCenter: {
        fontSize: 17,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        textAlign: "center",
        color: "#fff"
    },

    swiper: {
        flex: 1
    }
})
