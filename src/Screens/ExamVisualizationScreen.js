import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DetailExamContainer } from '../Containers';
import { HeaderTextButtonComponent } from '../Components';
import { examService } from '../Database';

export default class ExamVisualizationScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <HeaderTextButtonComponent
                    text={"Excluir"}
                    onPress={navigation.getParam("deleteExam")}
                />
            )
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            exam: props.exam || props.navigation.getParam("exam")
        }

        props.navigation.setParams({deleteExam:this.deleteExam})
    }

    deleteExam = () => {
        examService.deleteExam(this.getParam("userId"), this.state.exam)
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
                    action={this.editExam}
                />

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
