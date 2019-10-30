import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { HeaderTitleComponent, SearchInputComponent } from '../Components';
import { EmptyStateContainer, ExamsListContainer } from '../Containers';
import { examService } from '../Database';
import AppStyle from '../styles';

const MOCK = [
    {
        title: "Dr. Carlos",
        description: "Exame de sangue, cardiograma, hemograma, mais texto",
        date: new Date("2019-10-10"),
        images: [{ sourceImage: require("../Resources/add.png") },
        { sourceImage: require("../Resources/add.png") },
        { sourceImage: require("../Resources/add.png") }
        ]
    },
    {
        title: "Dr. André",
        description: "descrição de teste",
        date: new Date("2019-10-09"),
        images: [{ sourceImage: require("../Resources/add.png") },
        { sourceImage: require("../Resources/add.png") },
        { sourceImage: require("../Resources/add.png") }
        ]
    }
]

export default class ListExamsScreen extends Component {
    // TODO: mudar para pegar isso do Firebase, quando login estiver pronto
    userId = "user-id-001"

    constructor(props) {
        super(props);

        this.state = {
            uiState: "LOADING",
            allExams: [],
            visibleExams: []
        }

        // TODO: tratar erro
        examService.listExams(this.userId)
            .then(exams => this.setExams(exams))
            .catch(() => this.setExams([]))
    }

    setExams = (exams) => {
        this.setState({
            ...this.state,
            uiState: exams.length === 0 ? "EMPTY_STATE" : "LIST",
            allExams: exams,
            visibleExams: exams
        })
    }

    search = (text) => {
        const filteredExams = this.state.allExams.filter(({ name }) => {
            return name.toUpperCase().includes(text.toUpperCase())
        })

        this.setState({
            ...this.state,
            visibleExams: filteredExams
        });

    }

    createExam = () => {
        const didCreateExam = (exam) => {
            const exams = this.state.exams.slice()
            exams.unshift(exam)

            this.setState({
                ...this.state,
                uiState: "LIST",
                allExams: exams,
                visibleExams: exams
            })
        }

        this.props.navigation.navigate("ExamForm", {
            userId: this.userId,
            onCreate: didCreateExam
        })
    }

    selectExam = (index) => {
        const exam = this.state.visibleExams[index]
        console.log("selected", index, exam)
    }

    render() {
        const { uiState, visibleExams } = this.state
        let content

        if (uiState === "LOADING") {
            content = (
                <View style={styles.containerCenter}>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else if (uiState === "EMPTY_STATE") {
            content = (
                <View style={styles.containerCenter}>
                    <EmptyStateContainer local="fichas" buttonAction={this.createExam} />
                </View>
            )
        } else if (uiState === "LIST") {
            if (visibleExams.length === 0) {
                content = (
                    <View>
                        <SearchInputComponent
                            placeholder={"Pesquisar"}
                            callback={this.search} />
                        <View style={styles.containerCenter}>
                            <Text style={styles.emptySearchTitle}>Nenhum exame encontrado</Text>
                            <Text style={styles.emptySearchDescription}>Tente mudar os termos da sua pesquisa.</Text>
                        </View>
                    </View>
                )
            } else {
                const data = this._mapExams(visibleExams)
                content = (
                    <View style={styles.listContainer}>
                        <SearchInputComponent
                            placeholder={"Pesquisar"}
                            callback={this.search} />
                        <ExamsListContainer
                            data={data}
                            onSelect={this.selectExam}
                        />
                    </View>
                )
            }
        } else {
            console.warn("unexpected uiState", uiState)
            content = null
        }

        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Exames" />
                { content }
            </SafeAreaView>
        )
    }

    _mapExams = (exams) => {
        return exams.map(exam => {
            return {
                title: exam.name,
                description: exam.description,
                date: exam.creationDate,
                images: exam.imageObjects
            }
        })
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptySearchTitle: {
        fontSize: 20,
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        color: AppStyle.colors.darkText
    },
    emptySearchDescription: {
        marginTop: 20,
        fontSize: 16,
        color: AppStyle.colors.darkGray
    },
    listContainer: {
        flex: 1
    }
});
