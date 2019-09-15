import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderButton } from '../Components';
import createCancelAlert from './createCancelAlert';
import { ClosedListScreen } from '../Screens';
import { frequencyDescriptions, frequencyCodes } from '../frequencies';

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
    }

    render() {
        // TODO: mudar quando a tela de entrada de texto estiver concluída

        // TODO: mudar quando listagem aberta estiver pronta
        const defaultSymptoms = ["Dor de cabeça", "Cansaço", "Falta de ar", "Desânimo", "Náusea", "Dor no peito"];

        const symptoms = defaultSymptoms.map((symptom, index) => {
            return {
                id: index.toString(),
                texto: symptom
            }
        });

        const data = {
            titleText: "Informe suas principais queixas/sintomas",
            width: 0.42,
            list: symptoms
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

    _onCompleteName = (name) => {
        this.anamnesisRecord.name = name;

        // apenas o onComplete da primeira tela tem isso, e serve para habilitar o alerta quando
        // o usuário clica em "Cancelar" na primeira tela (caso ele volte para a mesma)
        this.props.navigation.setParams({ hasData: true });

        // como as telas são reusáveis, é preciso usar `push` (e não `navigate`),
        // para que o react-navigation apresente uma nova instância daquela tela
        // (se usar `navigate`, corre o risco de voltar para a última tela daquele tipo)
        this.props.navigation.push("SubitemsSelection", {
            onComplete: this._onCompleteEmail,
            onCancel: this._onCancel,
            data: this.name,
            title: "Ficha",
            progress: 0.3 // porcentagem da barra de progresso
        });
    }

    _onCompleteSymptoms = (symptoms) => {
        this.anamnesisRecord.symptoms = symptoms.map(symptom => symptom.texto);

        // TODO: mudar quando listagem aberta estiver pronta
        const availableMedicines = ["Omeprazol", "Dipirona", "AAS", "Diclofenaco"];
        const selectedMedicines = this.selectedMedicines || [];

        const medicines = availableMedicines.map((medicineName, index) => {
            return {
                id: index.toString(),
                texto: medicineName,
                isSelected: selectedMedicines.includes(medicineName)
            };
        });

        this.props.navigation.navigate("ClosedList", {
            titleText: "Medicamentos",
            description: "Informe os medicamentos que você usa atualmente.",
            width: 0.50,
            list: medicines,
            title: "Ficha",
            onComplete: this._onCompleteMedicines,
            onCancel: this._onCancel
        });
    }

    _onCompleteMedicines = (medicines) => {
        this.selectedMedicines = medicines.map(med => med.texto);

        const pastMedicines = this.anamnesisRecord.medicines || [];
        const makeIndices = (medicineName) => {
            const freq = pastMedicines.find(pm => pm.text === medicineName);
            if (!freq) return [];

            return [frequencyCodes.medicines.indexOf(freq.frequency)];
        }

        // TODO: unify with selected!!!
        const items = this.selectedMedicines.map(medicineName => {
            return {
                title: medicineName,
                subitems: frequencyDescriptions.medicines,
                selectedSubitems: makeIndices(medicineName)
            }
        });

        this.props.navigation.navigate("SubitemsList", {
            data: {
                title: "Frequência",
                description: "Informe a frequência de uso de cada medicamento.",
                requiresAllSelected: true,
                items
            },
            progress: 0.58,
            title: "Ficha",
            onComplete: this._onCompleteMedicinesFrequency,
            onCancel: this._onCancel
        });
    }

    _onCompleteMedicinesFrequency = (selectedIndices) => {
        const ttt = this.selectedMedicines.map((medicineName, index) => {
            const selectedIndex = selectedIndices[index][0];
            const frequencyCode = frequencyCodes.medicines[selectedIndex];

            return {
                name: medicineName,
                frequency: frequencyCode
            };
        });

        console.log(ttt);
        this.anamnesisRecord.medicines = ttt;

        // TODO: mover para última tela quando o fluxo estiver completo
        // a última tela deve persistir o conteúdo em `this.anamnesisRecord` no firebase
        // e, depois de concluído, navegar de volta para a tabbar (dismiss no fluxo)
        // (por isso o uso de `navigate`, e não de `push`)
        this.props.navigation.navigate("Main");
    }
}
