import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderButtonComponent } from '../Components';
import { TextInputScreen, EmojiScreen } from '../Screens';
import CreateCancelAlert from './CreateCancelAlert';
import * as InputProducers from '../Utils/InputProducers';
import * as OutputFilters from '../Utils/OutputFilters';
import { journalService } from '../Database';

export default class JournalEntryFormCoordinator extends Component {
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
            title: "Diário",
            headerRight: <HeaderButtonComponent text="Cancelar" onPress={onCancel} />
        };
    }

    constructor(props) {
        super(props);

        this.journalEntry = props.navigation.getParam("journalEntry", {});

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

        this.defaultStressLevel = ["Baixo", "Médio", "Alto"];
        this.defaultSymptoms = ["Dor de cabeça", "Cansaço", "Falta de ar", "Desânimo", "Náusea", "Dor no peito"];

        this.defaultParams = {
            title: "Diário",
            onCancel: this._onCancel
        }
    }

    _onCancel = () => {
        const dismiss = () => this.props.navigation.navigate("Main");
        Alert.alert(...CreateCancelAlert(dismiss));
    }

    render() {
        const saveResult = (result) => {
            this.journalEntry.humor = {
                emotion: result.emoji,
                text: result.text
            }
        }

        const data = {
            ...this.defaultParams,
            progress: 0,
            content: this.journalEntry.humor,
            onComplete: composeSavePush(saveResult, this.pushBloodPressure),
            emoji:  this.props.navigation.state.params.emoji ? this.props.navigation.state.params.emoji : this.journalEntry.humor 
        }
        return <EmojiScreen {...data}/>
    }

    pushBloodPressure = () => {
        console.log(this.journalEntry);
        const saveResult = (result) => {
            this.journalEntry.bloodPressure = this.outputFilters.textInput.removeWhitespace(result);
            this.props.navigation.setParams({ hasData: true });
        }

        this.props.navigation.push("TextInput", {
            ...this.defaultParams,
            callout: "Pressão Arterial",
            placeholder: "00/00 mmHg",
            progress: 0.33,
            required: true,
            content: this.journalEntry.bloodPressure,
            onComplete: composeSavePush(saveResult, this.pushStressLevel)
        })

    }

    pushStressLevel = () => {
        
        const saveResult = (result) => {
            this.journalEntry.stressLevel = this.outputFilters.closedList.singleItem(result);
        }

        const items = this.inputProducers.closedList.singleSelected(this.defaultStressLevel, this.journalEntry.stressLevel);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Nível de estresse",
            list: items,
            width: 0.5, // barra de progresso
            minSelected: 1,
            maxSelected: 1,
            onComplete: composeSavePush(saveResult, this.pushSymptoms)
        })
    }

    pushSymptoms = () => {
        const saveResult = (result) => {
            this.journalEntry.symptoms = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected(this.defaultSymptoms, this.journalEntry.symptoms);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Sintomas",
            list: items,
            width: 0.66,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.pushMedicines),
        })
    }

    pushMedicines = () => {
        const saveResult = (result) => {
            this.journalEntry.medicines = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected([], this.journalEntry.medicines);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Medicamentos do dia",
            list: items,
            width: 0.83,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.endFlow),
        })
    }

    endFlow = () => {
        this.journalEntry.creationDate = new Date();

        // TODO: remover quando tela de emojis estiver pronta
        /*this.journalEntry.humor = {
            emotion: "😞",
            text: "Cansado"
        }*/

        const save = journalService.saveEntry(this.getParam("userId"), this.journalEntry)
            .then(() => this.props.navigation.navigate("Main"))
            .catch(() => {
                return { title: "Algo deu errado", description: "Tente novamente mais tarde." }
            })
        
        this.props.navigation.push("Loading", {
            operation: save
        })
    }
}

const composeSavePush = (save, push) => (result) => {
    save(result);
    push();
}
