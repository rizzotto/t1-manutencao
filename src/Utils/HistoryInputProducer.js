
/**
 * Estrutura que gera as entradas para o container de histórico no formato por ele esperado.
 */
export default class HistoryInputProducer {

    /**
     * Formata um objeto `Date` no formato usado pelos headers do histórico, no formato `Mês / Ano`.
     * 
     * @param {Date} date data da seção a ser formatada para apresentação
     * @returns {string} string usada no header das seções do histórico
     */
    buildSectionHeader = (date) => {
        const months = [
            "Janeiro", "Fevereiro", "Março",
            "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"
        ]

        const month = months[date.getMonth()]
        return `${month} / ${date.getFullYear()}`
    }
    
    /**
     * Formata um título e conteúdo para apresentação em um item do container de histórico.
     * 
     * @param {string} title título do item (parte em negrito)
     * @param {string} content conteúdo do item (texto normal)
     * @returns {{ id: string, title: string }}} objeto no formato esperado pelo componente
     */
    buildHistoryEntrySubitem = (title, content) => {
        return {
            id: `${title}:`,
            title: ` ${content}.`
        }
    }

    /**
     * Formata uma lista de `string`s em forma textual, para ser apresentada como "texto corrido".
     * 
     * @param {string[]} textItems itens textuais a serem formatados para apresentação
     * @param {boolean} firstUppercase se a primeira letra do resultado deve ser capitalizada (maiúscula)
     * @param {boolean} allLowercase se todas as letras do resultado devem ser minúsculas (menor precedência sobre capitalizar a primeira usando `firstUppercase`)
     * @param {string} separator texto usado como separador (concatenado com um espaço (` `) entre os itens)
     * @returns {string} string com itens de forma textual
     */
    textifyList = (textItems = [], firstUppercase = false, allLowercase = true, separator = ",") => {
        let content = ""

        switch (textItems.length) {
            case 0:
                content = "nenhum"
                break;
            case 1:
                content = textItems[0]
                break;
            default:
                // precisamos fazer uma cópia para evitar mutar o array original no pop
                const items = textItems.slice(0)

                const last = items.pop()
                const list = items.join(`${separator} `)
                content = `${list} e ${last}`
                break;
        }

        if (allLowercase) {
            content = content.toLowerCase()
        }

        if (firstUppercase) {
            content = `${content[0].toUpperCase()}${content.slice(1)}`
        }

        return content;
    }
}
