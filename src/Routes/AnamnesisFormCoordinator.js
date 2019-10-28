import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderButtonComponent } from '../Components';
import CreateCancelAlert from './CreateCancelAlert';
import { MultiTextInputScreen } from '../Screens';
import { frequencyCodes } from '../Utils/frequencies';
import * as InputProducers from '../Utils/InputProducers';
import * as OutputFilters from '../Utils/OutputFilters';
import { anamnesisService } from '../Database';

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
                Alert.alert(...CreateCancelAlert(dismiss));
            } else {
                // se não tem dados, então apenas dá o dismiss no fluxo
                dismiss();
            }
        }

        return {
            title: "Ficha",
            headerRight: <HeaderButtonComponent text="Cancelar" onPress={onCancel} />
        };
    }

    constructor(props) {
        super(props);

        // se uma anamnese for passada como parâmetro, usar ela como base para as telas
        this.anamnesisRecord = props.navigation.getParam("anamnesisRecord", {});
        this.selectedMedicines = (this.anamnesisRecord.medicines || []).map(med => med.name);

        // dados padrão
        this.defaultSymptoms = ["Dor de cabeça", "Cansaço", "Falta de ar", "Desânimo", "Náusea", "Dor no peito"];
        this.defaultPathologies = ["Diabetes", "Hipertensão", "Gastrite", "Asma/Bronquite", "Alergias alimentares", "Intolerâncias alimentares", "Câncer"];
        this.defaultLifeRhythms = ["Calmo", "\"Normal\"", "Muito agitada"];
        this.defaultLifeStyles = ["Adequada", "Não adequada"];

        // objetos que geram as entradas para as listagens no formato esperado
        this.inputProducers = {
            textInput: new InputProducers.TextInputInputProducer(),
            closedList: new InputProducers.ClosedListInputProducer(),
            subitemList: new InputProducers.SubitemListInputProducer()
        }

        // objetos que mapeiam as saídas das telas para formatos predefinidos
        this.outputFilters = {
            textInput: new OutputFilters.TextInputOutputFilter(),
            closedList: new OutputFilters.ClosedListOutputFilter(),
            subitemList: new OutputFilters.SubitemListOutputFilter()
        };

        this.defaultParams = {
            title: "Ficha",
            onCancel: this._onCancel
        }
    }

    render() {
        const saveResult = (result) => {
            this.anamnesisRecord.name = this.outputFilters.textInput.removeWhitespace(result[0]);
            this.props.navigation.setParams({ hasData: true });
            this.anamnesisRecord.email = this.outputFilters.textInput.removeWhitespace(result[1]);
            this.anamnesisRecord.birthDate = this.outputFilters.textInput.date(result[2]);
        }

        const currentDate = this.inputProducers.textInput.dayMonthYear(this.anamnesisRecord.birthDate);

        const data = {
            ...this.defaultParams,
            callout: "Informe seus dados pessoais",
            description: ["Nome", "E-mail", "Data de Nascimento"],
            placeholder: ["Insira seu nome...", "email@exemplo.com", "DD/MM/AAAA"],
            inputMask: [null, null, {maskType: 'datetime', options:{format: 'DD/MM/YYYY'}}],
            progress: 0.0909,
            required: true,
            content: [this.anamnesisRecord.name, this.anamnesisRecord.email, currentDate],
            keyboardType: ["text", "email", "date"],
            onComplete: composeSavePush(saveResult, this.pushEmail)
        }

        return (
            <MultiTextInputScreen {...data} />
        );
    }

    /**
     * Apresenta o modal de alerta e dá dismiss no fluxo se o usuário confirmar.
     * É chamada quando o botão "Cancelar" no header de qualquer tela do fluxo for clicado.
     */
    _onCancel = () => {
        const dismiss = () => this.props.navigation.navigate("Main");
        Alert.alert(...CreateCancelAlert(dismiss));
    }

    // cada tela do fluxo possui uma função `push<Tela>`, que deve navegar a tela em questão
    // para as telas de listagem o formato básico é:
    // 1. definir como o resultado da tela é persistido
    // 2. definir os itens que serão exibidos
    // 3. navegar para a tela em questão, usando a função `composeSavePush` para especificar a função que vai salvar o resultado dessa tela e a função que vai apresentar a próxima tela
    // modificar a ordem das telas no fluxo consiste, basicamente, em mudar o segundo parâmetro da função `composeSavePush` e o parâmetro `progress`/`width` (barra de progresso)

    pushEmail = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.weight = this.outputFilters.textInput.number(result[0]);
            this.anamnesisRecord.height = this.outputFilters.textInput.number(result[1]);
        }

        const currentHeight = this.inputProducers.textInput.decimalNumber(this.anamnesisRecord.height, 2);
        const currentWeight = this.inputProducers.textInput.decimalNumber(this.anamnesisRecord.weight, 2);


        this.props.navigation.push("MultiTextInput", {
            ...this.defaultParams,
            callout: "Informe seu peso e altura",
            description: ["Peso", "Altura"],
            placeholder: ["00,00kg", "1.50m"],
            inputMask: [null,{maskType: "custom", options:{mask: "9.99"}}],
            required:true,
            progress: 0.1818,
            keyboardType: ["numeric", "height"],
            content: [currentWeight, currentHeight],
            onComplete: composeSavePush(saveResult, this.pushSymptoms)
        })
    }
    
    pushSymptoms = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.symptoms = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected(this.defaultSymptoms, this.anamnesisRecord.symptoms);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Informe suas principais queixas/sintomas",
            list: items,
            minSelected: 1,
            width: 0.2727,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.pushMedicines),
        })
    }

    pushMedicines = () => {
        const saveResult = (result) => {
            this.selectedMedicines = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected([], this.selectedMedicines);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Medicamentos",
            descriptionText: "Informe os medicamentos que você usa atualmente.",
            required:true,
            list: items,
            width: 0.3636,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.pushMedicinesFrequency)
        });
    }

    pushMedicinesFrequency = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.medicines = this.outputFilters.subitemList.medicineFrequencyList(result, this.selectedMedicines);
        }

        const items = this.inputProducers.subitemList.medicineFrequencyList(this.selectedMedicines, this.anamnesisRecord.medicines);

        // se nenhum medicamento foi selecionado, então pula essa tela
        if (items.length === 0) {
            this.pushPathologies();
            return;
        }

        this.props.navigation.navigate("SubitemsList", {
            ...this.defaultParams,
            data: {
                title: "Frequência",
                description: "Informe a frequência de uso de cada medicamento.",
                requiresAllSelected: true,
                items
            },
            progress: 0.4545,
            onComplete: composeSavePush(saveResult, this.pushPathologies)
        });
    }

    pushPathologies = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.pathologies = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected(this.defaultPathologies, this.anamnesisRecord.pathologies);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Você tem ou teve alguma patologia?",
            list: items,
            minSelected: 1,
            width: 0.5455,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.pushFamilyPathologies)
        })
    }

    pushFamilyPathologies = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.familyPathologies = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected(this.defaultPathologies, this.anamnesisRecord.familyPathologies);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Histórico familiar",
            descriptionText: "Alguém na sua família tem ou teve alguma dessas patologias?",
            list: items,
            width: 0.6364,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.pushHabits)
        })
    }

    pushHabits = () => {
        const habits = [
            { title: "Fumar", codes: frequencyCodes.smoking },
            { title: "Beber", codes: frequencyCodes.drinking },
            { title: "Atividade física", codes: frequencyCodes.physicalActivity }
        ];

        const saveResult = (result) => {
            this.anamnesisRecord.habits = this.outputFilters.subitemList.frequencyList(result, habits);
        }

        const items = this.inputProducers.subitemList.frequencyList(habits, this.anamnesisRecord.habits);

        this.props.navigation.push("SubitemsList", {
            ...this.defaultParams,
            data: {
                title: "Hábitos",
                description: "Informe seus hábitos que afetam sua saúde, como fumar e beber, e a frequência.",
                requiresAllSelected: true,
                items
            },
            progress: 0.7273,
            onComplete: composeSavePush(saveResult, this.pushLifeRhythm)
        })
    }

    pushLifeRhythm = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.lifeRhythm = this.outputFilters.closedList.singleItem(result);
        }

        const items = this.inputProducers.closedList.singleSelected(this.defaultLifeRhythms, this.anamnesisRecord.lifeRhythm);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Ritmo de vida",
            descriptionText: "Como você caracteriza seu \"ritmo\" de vida?",
            list: items,
            minSelected: 1,
            maxSelected: 1,
            width: 0.8182,
            onComplete: composeSavePush(saveResult, this.pushEatingStyle)
        })
    }

    pushEatingStyle = () => {
        const saveResult = (result) => {
            this.anamnesisRecord.eatingStyle = this.outputFilters.closedList.singleItem(result);
        }

        const items = this.inputProducers.closedList.singleSelected(this.defaultLifeStyles, this.anamnesisRecord.eatingStyle);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Alimentação",
            descriptionText: "Como você caracteriza sua alimentação?",
            list: items,
            minSelected: 1,
            maxSelected: 1,
            width: 0.9091,
            onComplete: composeSavePush(saveResult, this.endFlow)
        })
    }

    endFlow = () => {
        this.anamnesisRecord.creationDate = new Date();

        const save = anamnesisService.saveAnamnesis(this.getParam("userId"), this.anamnesisRecord)
            .then(() => this.props.navigation.navigate("Main"))
            .catch(() => {
                return { title: "Algo deu errado", description: "Tente novamente mais tarde." }
            })

        this.props.navigation.push("Loading", {
            operation: save
        });
    }
}

/**
 * Compõe uma função para salvar o resultado de uma tela e navegar para a próxima.
 * 
 * @param {function} save função que recebe como parâmetro o resultado de uma tela e deve persistir o mesmo no componente
 * @param {*} push função sem parâmetros que indica qual será a próxima tela do fluxo
 */
const composeSavePush = (save, push) => (result) => {
    save(result);
    push();
}
