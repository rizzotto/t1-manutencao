import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderButton } from '../Components';
import createCancelAlert from './createCancelAlert';
import { ClosedListScreen } from '../Screens';
import { frequencyCodes } from '../Utils/frequencies';
import * as InputProducers from '../Utils/InputProducers';
import * as OutputFilters from '../Utils/OutputFilters';

/**
 * Coordinator do formulário de criação/edição de anamnese.
 * 
 * Essa é apresentada como a primeira screen do fluxo, mas é responsável apenas pela lógica de navegação entre as screens genéricas. O método `render` retorna a primeira screen "real" do fluxo (com as configurações via `props`).
 */
export default class AnamnesisFormCoordinator extends Component {
    static navigationOptions = ({ navigation }) => {
        const dismiss = () => navigation.navigate("Main"); // voltar para tabbar (dismiss no modal)
        const onCancel = () => {
            // só mostra o alerta quando o usuário já tiver entrado com algum dado
            if (navigation.getParam("hasData", false)) {
                Alert.alert(...createCancelAlert(dismiss));
            } else {
                // se não tem dados, então apenas dá o dismiss no fluxo
                dismiss();
            }
        }

        return {
            title: "Ficha",
            headerRight: <HeaderButton text="Cancelar" onPress={onCancel} />
        };
    }

    constructor(props) {
        super(props);

        // se uma anamnese for passada como parâmetro, usar ela como base para as telas
        this.anamnesisRecord = props.navigation.getParam("anamnesisRecord", {});

        this.inputProducers = {
            closedList: new InputProducers.ClosedListInputProducer(),
            subitemList: new InputProducers.SubitemListInputProducer()
        }

        this.outputFilters = {
            closedList: new OutputFilters.ClosedListOutputFilter(),
            subitemList: new OutputFilters.SubitemListOutputFilter()
        };
    }

    render() {
        // TODO: mudar quando a tela de entrada de texto estiver concluída

        // TODO: mudar quando listagem aberta estiver pronta
        const defaultSymptoms = ["Dor de cabeça", "Cansaço", "Falta de ar", "Desânimo", "Náusea", "Dor no peito"];
        const items = this.inputProducers.closedList.multipleSelected(defaultSymptoms, this.anamnesisRecord.symptoms);

        const data = {
            titleText: "Informe suas principais queixas/sintomas",
            width: 0.42,
            list: items
        };

        return (
            <ClosedListScreen {...data}
                onCancel={this._onCancel}
                onComplete={this._onCompleteSymptoms}
            />
        );
    }

    /**
     * Apresenta o modal de alerta e dá dismiss no fluxo se o usuário confirmar.
     * É chamada quando o botão "Cancelar" no header de qualquer tela do fluxo for clicado.
     */
    _onCancel = () => {
        const dismiss = () => this.props.navigation.navigate("Main");
        Alert.alert(...createCancelAlert(dismiss));
    }

    // para cada tela do fluxo, há uma função `onComplete<Tela>` que recebe como parâmetro o dado
    // enviado pela tela (ex. texto digitado pelo usuário) e persiste (salva em `this.anamnesisRecord`)
    // no formato correto para o modelo (trata o resultado enviado pela screen, se necessário)
    // depois de persistir, a função navega para a próxima tela, passando os parâmetros que ela
    // necessita, como as funções `onComplete` e `onCancel`, e os dados que aquela tela espera (a
    // partir do que está salvo em `this.anamnesisRecord`)

    _onCompleteSymptoms = (result) => {
        this.anamnesisRecord.symptoms = this.outputFilters.closedList.allSelected(result);

        // apenas o onComplete da primeira tela tem isso, e serve para habilitar o alerta quando
        // o usuário clica em "Cancelar" na primeira tela (caso ele volte para a mesma)
        this.props.navigation.setParams({ hasData: true });

        const availableMedicines = ["Omeprazol", "Dipirona", "AAS", "Diclofenaco"];
        const items = this.inputProducers.closedList.multipleSelected(availableMedicines, this.selectedMedicines);

        this.props.navigation.navigate("ClosedList", {
            titleText: "Medicamentos",
            descriptionText: "Informe os medicamentos que você usa atualmente.",
            width: 0.4998,
            list: items,
            title: "Ficha",
            onComplete: this._onCompleteMedicines,
            onCancel: this._onCancel
        });
    }

    _onCompleteMedicines = (result) => {
        this.selectedMedicines = this.outputFilters.closedList.allSelected(result);

        const items = this.inputProducers.subitemList.medicineFrequencyList(this.selectedMedicines, this.anamnesisRecord.medicines);

        this.props.navigation.navigate("SubitemsList", {
            data: {
                title: "Frequência",
                description: "Informe a frequência de uso de cada medicamento.",
                requiresAllSelected: true,
                items
            },
            progress: 0.5712,
            title: "Ficha",
            onComplete: this._onCompleteMedicinesFrequency,
            onCancel: this._onCancel
        });
    }

    _onCompleteMedicinesFrequency = (result) => {
        this.anamnesisRecord.medicines = this.outputFilters.subitemList.medicineFrequencyList(result, this.selectedMedicines);

        const defaultPathologies = ["Diabetes", "Hipertensão", "Gastrite", "Asma/Bronquite", "Alergias alimentares", "Intolerâncias alimentares", "Câncer"];
        const items = this.inputProducers.closedList.multipleSelected(defaultPathologies, this.anamnesisRecord.pathologies);

        this.props.navigation.push("ClosedList", {
            titleText: "Você tem ou teve alguma patologia?",
            width: 0.6426,
            list: items,
            title: "Ficha",
            onComplete: this._onCompletePathologies,
            onCancel: this._onCancel
        })
    }

    _onCompletePathologies = (result) => {
        this.anamnesisRecord.pathologies = this.outputFilters.closedList.allSelected(result);

        const defaultPathologies = ["Diabetes", "Hipertensão", "Gastrite", "Asma/Bronquite", "Alergias alimentares", "Intolerâncias alimentares", "Câncer"];
        const items = this.inputProducers.closedList.multipleSelected(defaultPathologies, this.anamnesisRecord.familyPathologies);

        this.props.navigation.push("ClosedList", {
            titleText: "Histórico familiar",
            descriptionText: "Alguém na sua família tem ou teve alguma dessas patologias?",
            width: 0.714,
            list: items,
            title: "Ficha",
            onComplete: this._onCompleteFamilyPathologies,
            onCancel: this._onCancel
        })
    }

    _onCompleteFamilyPathologies = (result) => {
        this.anamnesisRecord.familyPathologies = this.outputFilters.closedList.allSelected(result);

        const habits = [
            { title: "Fumar", codes: frequencyCodes.smoking },
            { title: "Beber", codes: frequencyCodes.drinking },
            { title: "Atividade física", codes: frequencyCodes.physicalActivity }
        ];

        const items = this.inputProducers.subitemList.frequencyList(habits, this.anamnesisRecord.habits);

        this.props.navigation.push("SubitemsList", {
            data: {
                title: "Hábitos",
                description: "Informe seus hábitos que afetam sua saúde, como fumar e beber, e a frequência.",
                requiresAllSelected: false,
                items
            },
            progress: 0.7853,
            title: "Ficha",
            onComplete: this._onCompleteHabits,
            onCancel: this._onCancel
        })
    }

    _onCompleteHabits = (selectedIndices) => {
        const habits = [
            { title: "Fumar", codes: frequencyCodes.smoking },
            { title: "Beber", codes: frequencyCodes.drinking },
            { title: "Atividade física", codes: frequencyCodes.physicalActivity }
        ];

        this.anamnesisRecord.habits = this.outputFilters.subitemList.frequencyList(selectedIndices, habits);

        const defaultRhythms = ["Calmo", "\"Normal\"", "Muito agitada"];
        const items = this.inputProducers.closedList.singleSelected(defaultRhythms, this.anamnesisRecord.lifeRhythm);

        this.props.navigation.push("ClosedList", {
            titleText: "Ritmo de vida",
            descriptionText: "Como você caracteriza seu \"ritmo\" de vida?",
            width: 0.8568,
            list: items,
            minSelected: 1,
            maxSelected: 1,
            title: "Ficha",
            onComplete: this._onCompleteLifeRhythm,
            onCancel: this._onCancel
        })
    }

    _onCompleteLifeRhythm = (result) => {
        this.anamnesisRecord.lifeRhythm = this.outputFilters.closedList.singleItem(result);

        const defaultStyles = ["Adequada", "Não adequada"];
        const items = this.inputProducers.closedList.singleSelected(defaultStyles, this.anamnesisRecord.eatingStyle);

        this.props.navigation.push("ClosedList", {
            titleText: "Alimentação",
            descriptionText: "Como você caracteriza sua alimentação?",
            width: 0.9282,
            list: items,
            minSelected: 1,
            maxSelected: 1,
            title: "Ficha",
            onComplete: this._onCompleteEatingStyle,
            onCancel: this._onCancel
        })
    }

    _onCompleteEatingStyle = (result) => {
        this.anamnesisRecord.eatingStyle = this.outputFilters.closedList.singleItem(result);

        console.log(this.anamnesisRecord);
        console.warn(this.anamnesisRecord);
        // this.props.navigation.navigate("Main");
    }
}
