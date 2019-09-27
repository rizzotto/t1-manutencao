
/**
 * Serviço de persistência de entradas do acompanhamento diário no Firebase.
 * 
 * Ver documentação associada em `docs/JournalEntry.js`.
 */
export default class JournalService {
    /**
     * Inicializa o serviço usando uma instância do Firebase Realtime Database.
     */
    constructor(database) {
        this.db = database;
    }

    /**
     * Persiste uma entrada de acompanhamento diário.
     * 
     * @param {string} userId identificador do usuário de quem a entrada se refere
     * @param {any} entry objeto com as informações do acompanhamento diário (ver `docs/JournalEntry.js`)
     * @returns {Promise<any>} promise que completa quando a operação de persistência é finalizada
     */
    saveEntry = (userId, entry) => {
        // remover data de criação
        const creationDate = entry.creationDate;
        entry.creationDate = null;

        // criar caminho de acordo com data de criação
        const datePath = this._mapDatePath(creationDate);
        return this.db.ref(`${userId}/journalEntries/${datePath}`).set(entry);
    }

    /**
     * Lista as entradas do diário de um usuário.
     * 
     * @param {string} userId id do usuário de quem as entradas do diário devem ser listadas
     * @returns {{ date: Date, entries: any[] }[]} entradas do diário agrupadas por mês e ordenadas da mais recente para a mais antiga (itens em `entries` seguem padrão definido em `docs/JournalEntry.js`)
     */
    listEntries = async (userId) => {
        const snapshot = await this.db.ref(`${userId}/journalEntries`).orderByKey().once("value");
        const value = snapshot.val();

        return this._mapEntries(value);
    }

    /**
     * Mapeia um objeto com várias entradas de diário em uma lista com as entradas agrupadas por mês.
     * 
     * @param {{ [date: number]: { [time: number]: any } }} rawEntries dados conforme armazenados no Firebase
     * @returns {{ date: Date, entries: any[] }[]} entradas do diário agrupadas por mês e ordenadas da mais recente para mais antiga
     */
    _mapEntries = (rawEntries) => {
        const result = [];

        Object.keys(rawEntries)
            .forEach(dateString => { // dateString: YYYYMMDD
                const date = this._mapDateString(dateString);
                const rawDayEntries = rawEntries[dateString];

                // mapeia cada entrada para um objeto válido do tipo JournalEntry, que pode ser usado pela aplicação
                const dayEntries = Object.keys(rawDayEntries)
                    .map(timeString => { // timeString: HHmmss
                        const creationDate = this._mapTimeString(timeString, date);
                        const entry = rawDayEntries[timeString];
                        entry.creationDate = creationDate;
                        return entry;
                    });
                
                // entradas do dia já mapeadas
                // adicionar entradas do dia no resultado final

                // data com apenas ano e mês setados, e no primeiro dia do mês
                const dateMonth = this._mapPartialDate(dateString);

                // índice da entrada do mês no resultado final
                const index = result.findIndex(obj => obj.date.getTime() === dateMonth.getTime());

                if (index >= 0) {
                    // se já existir, apenas adicionar as entradas diárias
                    const currentEntries = result[index].entries;
                    result[index].entries = currentEntries.concat(dayEntries);
                } else {
                    // se não, adicionar nova entrada para o mês
                    result.push({ date: dateMonth, entries: dayEntries });
                }
            });
        
        // ordenar entradas do mês
        result.forEach(monthEntry => monthEntry.entries.sort((a, b) => a.creationDate < b.creationDate));

        // ordenar os meses
        result.sort((a, b) => a.date < b.date);
        
        return result;
    }

    //
    // HELPERS
    //

    /**
     * Mapeia uma data (objeto) para o caminho onde a entrada do diário será persistida.
     * 
     * @param {Date} date data a ser mapeada para um caminho data/hora
     * @returns {string} caminho no formato `YYYYMMDD/HHmmss`
     */
    _mapDatePath = (date) => {
        const pad = (n) => n.toString().padStart(2, "0");

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateString = `${date.getFullYear()}${pad(month)}${pad(day)}`;

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const timeString = `${pad(hours)}${pad(minutes)}${pad(seconds)}`;

        return `${dateString}/${timeString}`;
    }

    /**
     * Parseia uma data em string para uma data parcial (mês e ano).
     * 
     * @param {string} dateString data no formato `YYYYMMDD`
     * @returns {Date} data usando ano e mês em `dateString` e no primeiro dia do mês
     */
    _mapPartialDate = (dateString) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);

        return new Date(parseInt(year), parseInt(month) - 1, 1);
    }

    /**
     * Parseia uma data em string para uma data "completa" (dia, mês e ano).
     * 
     * @param {string} dateString data no formato `YYYYMMDD`
     * @returns {Date} data baseada no valor em `rawDate`, apenas com ano, mês e dia explicitamente definidos
     */
    _mapDateString = (dateString) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6);

        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    /**
     * Parseia um horário em string e define valores parseados em uma data existente.
     * 
     * @param {string} timeString horário no formato `HHmmss`
     * @param {Date} baseDate data base onde o horário será definido
     * @returns {Date} nova data baseada em `oldDate`, mas com horas, minutos e segundos a partir do valor em `rawTime`
     */
    _mapTimeString = (timeString, baseDate) => {
        const hours = timeString.substring(0, 2);
        const minutes = timeString.substring(2, 4);
        const seconds = timeString.substring(4);

        const date = new Date(baseDate.getTime());
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        date.setSeconds(parseInt(seconds));

        return date;
    }
}
