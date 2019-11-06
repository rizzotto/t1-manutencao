import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderTextButtonComponent } from '../Components';
import { ImageSelectionScreen } from '../Screens';
import CreateCancelAlert from './CreateCancelAlert';
import * as InputProducers from '../Utils/InputProducers';
import * as OutputFilters from '../Utils/OutputFilters';
import { examService } from '../Database';

/**
 * Coordinator de criação/edição de exames.
 */
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
            title: "Exame",
            headerRight: <HeaderTextButtonComponent text="Cancelar" onPress={onCancel} />
        };
    }

    constructor(props) {
        super(props);

        this.exam = props.navigation.getParam("exam", {})

        this.textInputFilter = new InputProducers.TextInputInputProducer()
        this.textOutputFilter = new OutputFilters.TextInputOutputFilter()

        this.defaultParams = {
            title: "Exame",
            onCancel: this._onCancel
        }
    }

    _onCancel = () => {
        const dismiss = () => this.props.navigation.navigate("Main");
        Alert.alert(...CreateCancelAlert(dismiss));
    }

    render() {
        const saveResult = (result) => {
            this.exam.imageObjects = result
            this.props.navigation.setParams({ hasData: true })
        }

        const data = {
            ...this.defaultParams,
            progress: 0.25,
            title: "Adicione imagens",
            description: "Você deve adicionar pelo menos uma imagem para continuar, e pode adicionar quantas imagens quiser.",
            images: this.exam.imageObjects,
            onComplete: composeSavePush(saveResult, this.pushTitle)
        }

        return <ImageSelectionScreen { ...data } />
    }

    pushTitle = () => {
        const saveResult = (result) => {
            this.exam.name = this.textOutputFilter.removeWhitespace(result)
        }

        this.props.navigation.push("TextInput", {
            ...this.defaultParams,
            callout: "Informe um título",
            placeholder: "Informe um título...",
            progress: 0.5,
            required: true,
            content: this.exam.name,
            onComplete: composeSavePush(saveResult, this.pushDescription)
        })
    }

    pushDescription = () => {
        const saveResult = (result) => {
            this.exam.description = this.textOutputFilter.removeWhitespace(result)
        }

        this.props.navigation.push("TextInput", {
            ...this.defaultParams,
            callout: "Adicione uma descrição",
            description: "Uma boa descrição facilita a busca pelos exames mais tarde.",
            placeholder: "Adicione uma descrição...",
            progress: 0.75,
            required: true,
            content: this.exam.description,
            onComplete: composeSavePush(saveResult, this.endFlow)
        })
    }

    endFlow = () => {
        if (this.exam.creationDate) {
            // atualizar
        } else {
            // criar
            this.exam.creationDate = new Date()

            const save = examService.createExam(this.getParam("userId"), this.exam)
                .then(() => {
                    const onCreate = this.props.navigation.getParam("onCreate")
                    if (onCreate) onCreate(this.exam)

                    // navegar duas telas para trás: loading e coordinator
                    this.props.navigation.pop(2)
                })
                .catch(() => {
                    return { title: "Algo deu errado", description: "Não foi possível salvar seu exame. Tente novamente mais tarde." }
                })
            
            this.props.navigation.push("Loading", {
                operation: save
            })
        }
    }
}

const composeSavePush = (save, push) => (result) => {
    save(result);
    push();
}
