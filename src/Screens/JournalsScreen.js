import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HeaderTitleComponent } from '../Components';
import { HistoryContainer } from '../Containers';
import { journalService } from '../Database';

export default class JournalsScreen extends Component {
    // TODO: mudar para pegar isso do Firebase, quando login estiver pronto
    userId = "user-id-001"

    constructor(props) {
        super(props);

        this.state = {
            sections: []
        }

        journalService.listEntries(this.userId)
            .then(entriesByMonth => this.setEntries(entriesByMonth))
            .catch(err => console.warn(err));
    }

    /**
     * @param {Date} date
     */
    _formatMonthYear = (date) => {
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return `${months[date.getMonth()]} / ${date.getFullYear()}`;
    }

    setEntries = (entriesByMonth) => {
        const sections = entriesByMonth.map(monthEntries => {
            const entries = monthEntries.entries.map(entry => {
                const bloodPressure = {
                    id: "Pressão:",
                    title: ` ${entry.bloodPressure} mmHg.`
                }

                const symptoms = {
                    id: "Sintomas:",
                    title: (entry.symptoms || []).length === 0 ? " nenhum." : ` ${entry.symptoms.join(", ")}.`
                }

                const medicines = {
                    id: "Medicamentos:",
                    title: (entry.medicines || []).length === 0 ? " nenhum." : ` ${entry.medicines.join(", ")}.`
                }

                return {
                    date: entry.creationDate,
                    emoji: entry.humor.emotion,
                    list: [bloodPressure, symptoms, medicines]
                }
            });

            return {
                title: this._formatMonthYear(monthEntries.date),
                data: entries
            }
        });

        this.setState({ sections });
    }

    onSelectEntry = (date) => {
        console.warn("selected entry on date", date);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderTitleComponent title="Diário" />
                <HistoryContainer
                    section={this.state.sections}
                    hasEmoji={true}
                    action={this.onSelectEntry}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
