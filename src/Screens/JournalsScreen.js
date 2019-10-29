import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView, SafeAreaView, StyleSheet, Text, Platform } from 'react-native';
import { HeaderTitleComponent } from '../Components';
import { HistoryContainer, EmptyStateContainer, CarouselContainer } from '../Containers';
import JournalEntryFormatter from '../Utils/JournalEntryFormatter';
import { journalService } from '../Database';
import AppStyle from '../styles';

export default class JournalsScreen extends Component {
    // TODO: mudar para pegar isso do Firebase, quando login estiver pronto
    userId = "user-id-001"

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }

        // TODO: tratar erro
        journalService.listEntries(this.userId)
            .then(entriesByMonth => this.updateUI(entriesByMonth))
            .catch(() => this.updateUI([]));
    }

    /** Atualiza a tela com o resultado da requisição para listagem de entradas. */
    updateUI = (entriesByMonth) => {
        const entryFormatter = new JournalEntryFormatter()
        const sections = entryFormatter.buildHistoryEntries(entriesByMonth)

        this.setState({
            sections,
            entries: entriesByMonth,
            hasItems: sections.length !== 0,
            isLoading: false
        })
    }

    /** Encontra uma entrada no diário a partir de sua data. */
    _findEntry = (entriesByMonth, date) => {
        // para cada mês
        for (const monthEntry of entriesByMonth) {
            // achar uma possível entry na mesma data da selecionada
            const possibleEntry = monthEntry.entries.find(entry => entry.creationDate.getTime() === date.getTime());

            // se achou, retorna
            if (possibleEntry !== null && possibleEntry !== undefined) {
                return possibleEntry;
            }
        }
    }

    /** Invocado quando uma entrada no diário é selecionada. */
    onSelectEntry = (date) => {
        const entry = this._findEntry(this.state.entries, date);
        // TODO: navegar para tela de detalhes quando estiver pronta (fica para a edição por enquanto)
        this.props.navigation.navigate("DiaryDetail", {
            userId: this.userId,
            journalEntry: entry
        });
    }

    /** Invocado quando o botão no empty state é clicado. */
    createEntryFromEmptyState = () => {
        this.props.navigation.navigate("JournalEntryForm", { userId: this.userId });
    }

    onSelectEmoji = (item) => {
        this.props.navigation.navigate("JournalEntryForm", {emoji: item, userId: this.userId})
    }

    componentDidUpdate(prevProps){
        if(!this.props.navigation.getParam('updatedData') && this.props.navigation.getParam('date')){
            this.onSelectEntry(this.props.navigation.getParam('date'));
        }
        if(this.props.navigation.getParam('updatedData')){
            this.setState({isLoading: true})
            this.props.navigation.state.params.updatedData = false;
            journalService.listEntries(this.userId).then(dataDB => this.updateUI(dataDB))
        }
    }

    render() {
        const { sections, hasItems, isLoading } = this.state;

        let content;

        if (isLoading) {
            content = (
                <View style={styles.containerCenter}>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else if (!hasItems) {
            content = (
                <View style={styles.containerCenter}>
                    <EmptyStateContainer local="diario" buttonAction={this.createEntryFromEmptyState} />
                </View>
            )
        } else {
            content = (
                <ScrollView>
                    <View style={styles.carouselContainer}>
                        <CarouselContainer action={this.onSelectEmoji} />
                        <Text style={styles.carouselLabel}>Como você está se sentindo hoje?</Text>
                    </View>
                    <HistoryContainer
                        section={sections}
                        hasEmoji={true}
                        action={this.onSelectEntry}
                    />
                </ScrollView>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Diário" />
                { content }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    carouselLabel: {
        alignItems: "center",
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        fontSize: 17,
        marginTop: 25,
        marginBottom: 20,
        textAlign: "center"
    },
    carouselContainer: {
        borderBottomWidth: 2,
        borderBottomColor: AppStyle.colors.mediumGray
    }
});
