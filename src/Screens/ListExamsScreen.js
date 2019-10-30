import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { HeaderTitleComponent, SearchInputComponent, HeaderImageButtonComponent } from '../Components';
import { EmptyStateContainer, ExamsListContainer } from '../Containers';
import { examService } from '../Database';
import AppStyle from '../styles';

export default class ListExamsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <HeaderImageButtonComponent
                    image={require("../Resources/headerAdd.png")}
                    onPress={navigation.getParam("createExamAction")}
                />
            )
        }
    }

    // TODO: mudar para pegar isso do Firebase, quando login estiver pronto
    userId = "user-id-001"

    constructor(props) {
        super(props);

        this.state = {
            uiState: "LOADING",
            allExams: [],
            visibleExams: []
        }

        // TODO: tratar error
        examService.listExams(this.userId)
            .then(exams => this.setExams(exams))
            .catch(() => this.setExams([]))
        
        props.navigation.setParams({ createExamAction: this.createExam })
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
        const exam = this.state.visibleExams[index];

        this.props.navigation.navigate("ExamDetail", {
            exam: exam,
            userId: this.userId
        });
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
