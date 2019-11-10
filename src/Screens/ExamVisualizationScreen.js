import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DetailExamContainer } from '../Containers';

export default class ExamVisualizationScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exam: props.exam || props.navigation.getParam("exam")
        }
    }

    imageSelected = (index) => {
        this.props.navigation.navigate("Gallery", {
            page: index,
            images: this.props.navigation.getParam("exam").imageObjects
        })
    }

    editExam = () => {
        this.props.navigation.navigate("ExamForm", {
            userId: this.props.navigation.getParam("userId"),
            exam: this.state.exam,
            onUpdate: this.didEditExam.bind(this)
        })
    }

    didEditExam = (exam) => {
        this.setState({ ...this.state, exam })

        // atualizar listagem com novo exame
        const onUpdate = this.props.navigation.getParam("onUpdate")
        if (onUpdate) onUpdate(exam)
    }
    
    render() {
        const exame = this.state.exam;
        return (
            <SafeAreaView style={styles.container}>
                <DetailExamContainer 
                    exame={exame} 
                    imageToScreen={this.imageSelected}
                    onEdit={this.editExam}
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
