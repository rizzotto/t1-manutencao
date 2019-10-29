import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import RecordDetailContainer from '../Containers/RecordDetailContainer';
import ExamsListContainer from '../Containers/ExamsListContainer';
import SearchInputComponent from '../Components/SearchInputComponent';
import EmptyStateContainer from '../Containers/EmptyStateContainer';

//caso tu queira testar a screen, importa ela no RecordDetailContainer.js sem passar parametro algum!


//tirar essa variavel daqui
var isEmpty = false


export default class ListExamsScreen extends Component {

    constructor(props) {
        super(props);

        const mock = [
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
                date: new Date("2019-10-10"),
                images: [{ sourceImage: require("../Resources/add.png") },
                { sourceImage: require("../Resources/add.png") },
                { sourceImage: require("../Resources/add.png") }
                ]
            }
        ]
        this.state = {
            allExams: mock,
            visibleExams: mock,
        }


    }

    searchCallback = (text) => {
        //console.warn(text);
        this.setState({
            ...this.state,
            visibleExams: this.state.allExams.filter(x => x.title.toUpperCase().includes(text.toUpperCase()))
        });

    }






    render() {
        if (this.state.allExams.length === 0) {
            return (
                //arrumar o css do emptyState/Screen
                <EmptyStateContainer

                    local={'fichas'}
                    //arrumar a funcao do botao
                    buttonAction={this._newRecord}
                />
            )
        }
        else if (this.state.visibleExams.length === 0) {
            return (
                <SafeAreaView>
                    <SearchInputComponent

                        placeholder={"Pesquisar"}
                        callback={this.searchCallback}></SearchInputComponent>
                    <View style={styles.textStyle}>
                        <Text
                        >Nenhum resultado da pesquisa</Text>
                    </View>

                </SafeAreaView>

            )
        }


        return (
            //Adicionar na bottom bar o icone de exames, sendo essa a primeira screen
            //Setar o Titulo da screen : Exames

            <SafeAreaView>
                <SearchInputComponent
                    //Arrumar o css do pesquisar
                    //textStyle={styles.text}
                    //viewStyle={styles.view}
                    placeholder={"Pesquisar"}
                    callback={this.searchCallback}></SearchInputComponent>
                <ExamsListContainer
                    //Verificar como pegar a url do firebase, como conseguir passar por promise..
                    data={this.state.visibleExams}
                />
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    emptyStateText: {
        
    },
    textStyle:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    }
});
