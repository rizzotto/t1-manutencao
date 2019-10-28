import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import RecordDetailContainer from '../Containers/RecordDetailContainer';
import ExamsListContainer from '../Containers/ExamsListContainer';
import SearchInputComponent from '../Components/SearchInputComponent';
import EmptyStateContainer from '../Containers/EmptyStateContainer';

//caso tu queira testar a screen, importa ela no RecordDetailContainer.js sem passar parametro algum!


//tirar essa variavel daqui
var isEmpty=false


export default class AnamnesisDetailScreen extends Component {
    

    render() {
        if (isEmpty) {
            return (
                //arrumar o css do emptyState/Screen
                <EmptyStateContainer
                
                    local={'fichas'}
                    //arrumar a funcao do botao
                    buttonAction={this._newRecord}
                />
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
                    callback={this.myCallBack}></SearchInputComponent>
                <ExamsListContainer
                    //Verificar como pegar a url do firebase, como conseguir passar por promise..
                    data={[
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
                            title: "Dr. Carlos",
                            description: "Exame de sangue, cardiograma, hemograma, mais texto",
                            date: new Date("2019-10-10"),
                            images: [{ sourceImage: require("../Resources/add.png") },
                            { sourceImage: require("../Resources/add.png") },
                            { sourceImage: require("../Resources/add.png") }
                            ]
                        }
                    ]}
                />

            </SafeAreaView>
        )
    }

}