import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderButton } from '../Components';
import createCancelAlert from './createCancelAlert';
import { ListSubitemsScreen } from '../Screens';

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

        // como a seleção de medicamentos é separada em duas telas (uma para entrada dos nomes dos
        // medicamentos e outra para as frequências), o nome dos medicamentos é guardado separado das
        // frequências; a lista de medicamentos em `this.anamnesisRecord.medicines` só é setada
        // quando a tela de frequência completa (`onCompleteMedicinenFrequency`)
        this.selectedMedicines = (this.anamnesisRecord.medicines || []).map(m => m.name);
    }

    medicinesFrequencies = [
        { code: "6-6h", text: "a cada 6 horas" },
        { code: "8-8h", text: "a cada 8 horas" },
        { code: "12-12h", text: "a cada 12 horas" },
        { code: "24-24h", text: "a cada 24 horas" },
        // outras frequência de medicamentos... (TODO: talvez colocar isso em outro lugar? (quando for usado em outras telas))
    ]

    render() {
        // TODO: mudar quando a tela de entrada de texto estiver concluída

        // considerando que a tela de frequência de medicamentos é a primeira
        const frequencies = this.medicinesFrequencies.map(freq => freq.text);
        const items = this.selectedMedicines.map(medName => {
            return {
                title: medName,
                subitems: frequencies,
                selectedSubitems: [] // TODO: fazer lógica de itens já selecionados
            }
        });

        const data = {
            title: "Frequência",
            description: "Informe a frequência de uso de cada medicamento.",
            requiresAllSelected: true,
            items
        };

        return (
            <ListSubitemsScreen data={data}
                onComplete={this._onCompleteMedicinesFrequency}
                onCancel={this._onCancel}
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

    _onCompleteMedicinesFrequency = (selectedIndices) => {
        this.anamnesisRecord.medicines = selectedIndices;

        // TODO: mover para última tela quando o fluxo estiver completo
        // a última tela deve persistir o conteúdo em `this.anamnesisRecord` no firebase
        // e, depois de concluído, navegar de volta para a tabbar (dismiss no fluxo)
        // (por isso o uso de `navigate`, e não de `push`)
        this.props.navigation.navigate("Main");
    }
}
