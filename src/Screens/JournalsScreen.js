import React, { Component } from 'react';
import { View, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { HeaderTitleComponent } from '../Components';
import { HistoryContainer, EmptyStateContainer, CarouselContainer } from '../Containers';
import JournalEntryFormatter from '../Utils/JournalEntryFormatter';
import { journalService } from '../Database';

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
        this.props.navigation.navigate("JournalEntryForm", {
            userId: this.userId,
            journalEntry: entry
        });
    }

    /** Invocado quando o botão no empty state é clicado. */
    createEntryFromEmptyState = () => {
        this.props.navigation.navigate("JournalEntryForm", { userId: this.userId });
    }

    onSelectEmoji = () => {

        this.props.navigation.navigate("JournalEntryForm")
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
                <>
                    <CarouselContainer
                        action={this.onSelectEmoji}
                    />
                    <HistoryContainer
                        section={sections}
                        hasEmoji={true}
                        action={this.onSelectEntry}
                    />
                </>
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
    }
});
