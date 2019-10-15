import HistoryInputProducer from './HistoryInputProducer';

/**
 * Estrutura capaz de formatar um objeto do tipo `JournalEntry` para o formato esperado pelo container de histórico.
 * 
 * Ver documentação do formato de uma `JournalEntry` em `Database/docs/JournalEntry.js`.
 */
export default class JournalEntryFormatter {
    historyProducer = new HistoryInputProducer()

    /**
     * Formata uma lista de entradas agrupadas por mês para o formato esperado pelo container.
     * 
     * @param {{ date: Date, entries: any[] }[]} entriesByMonth entradas de diário agrupadas por mês, conforme retornado pelo serviço
     * @returns {{ title: string, data: any[]}[]} lista de itens de histórico no formato esperado pelo container
     */
    buildHistoryEntries = (entriesByMonth = []) => {
        return entriesByMonth.map(monthEntry => {
            return {
                title: this.historyProducer.buildSectionHeader(monthEntry.date),
                data: monthEntry.entries.map(this.buildHistoryEntry)
            }
        })
    }

    /**
     * Formata um objeto do tipo `JournalEntry` no formato esperado por um componente de item de histórico.
     * 
     * @param {JournalEntry} journalEntry objeto no formato `JournalEntry`
     * @returns {any} objeto no formato esperado pelo componente
     */
    buildHistoryEntry = (journalEntry) => {
        const { textifyList, buildHistoryEntrySubitem: entrySubitem } = this.historyProducer;

        return {
            date: journalEntry.creationDate,
            emoji: journalEntry.humor.emotion,
            list: [
                entrySubitem("Pressão", `${journalEntry.bloodPressure} mmHg`),
                entrySubitem("Sintomas", textifyList(journalEntry.symptoms)),
                entrySubitem("Medicamentos", textifyList(journalEntry.medicines))
            ]
        }
    }
}
